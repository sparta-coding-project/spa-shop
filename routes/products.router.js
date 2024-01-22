import express from "express";
import Products from "../schemas/products.schema.js";
import productValidationSchema from "../validation/product.validation.js";
import { CustomError } from "../utils.js";
import { hashPW, checkPW } from "../utils.js";

const router = express.Router();

router
  .route("/products")
  .get(async (req, res, next) => {
    try {
      // 몽고디비 데이터 가져오기
      const products = await Products.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ products: products });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
      next(error);
    }
  })
  .post(async (req, res, next) => {
    // validation (Joi)
    const { error: err } = productValidationSchema.validate(req.body);
    console.log(err);
    if (err) {
      return res.status(400).send(err.details[0].message);
    }
    try {
      const { title, content, author, isSales, password } = req.body;
      const hashedPW = await hashPW(password);
      // 몽고디비에 데이터 추가하기
      const createProduct = await Products.create({
        title,
        content,
        author,
        isSales,
        password: hashedPW,
      });
      return res.status(201).json({ message: "판매 상품을 등록하였습니다." });
    } catch (error) {
      console.log(error);
      next();
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
  });

router
  .route("/products/:productId")
  .get(async (req, res, next) => {
    try {
      const { productId } = req.params;
      const specificProduct = await Products.find({ _id: productId });
      return res.status(200).json({ data: specificProduct });
    } catch (error) {
      res.status(404).json({message: "상품 조회에 실패했습니다."})
      next(error);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { title, content, isSales, password } = req.body;

      const specificProduct = await Products.findOne({ _id: productId });

      const updateData = {
        $set: {
          title,
          content,
          isSales,
        },
      };
      if (await checkPW(password, specificProduct.password)){
        await Products.updateOne({ _id: productId }, updateData);
        return res.status(201).json({message: "상품 정보를 수정하였습니다."});
      }else{
        throw new CustomError("password");
      }

    } catch (error) {
      const {path} = error
      switch(path){
        case "_id":
          return res.status(404).json({message: "상품조회에 실패했습니다."});
          break;
        case "password":
          return res.status(401).json({message: "상품을 수정할 권한이 존재하지 않습니다."});
          break;
      }
      next(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const { productId } = req.params;
      const { password } = req.body;
      const specificProduct = await Products.findOne({ _id: productId });

      if (await checkPW(password, specificProduct.password)) {
        await Products.deleteOne({ _id: productId });
        return res.status(201).json({message: "상품을 삭제하였습니다."})
      }else{
        throw new CustomError("password");
      }
    } catch (error) {
      const {path} = error
      switch(path){
        case "_id":
          return res.status(404).json({message: "상품조회에 실패했습니다."});
          break;
        case "password":
          return res.status(401).json({message: "상품을 수정할 권한이 존재하지 않습니다."});
          break;
      }
    }
  });

export default router;
