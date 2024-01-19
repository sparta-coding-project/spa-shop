import express from "express";
import Products from "../schemas/products.schema.js";

const router = express.Router();

router
  .route("/products")
  .get(async (req, res, next) => {
    try {
      // 몽고디비 데이터 가져오기
      const products = await Products.find({});
      console.log(products);
      return res.status(200).json({ products: products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { title, content, author, password } = req.body;
      // 몽고디비에 데이터 추가하기
      const createProduct = await Products.create({
        product: {
          title: title,
          content: content,
          author: author,
          password: password,
        },
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
  .get((req, res) => {})
  .put((req, res) => {
    const { title, content, author, password } = req.body;
  })
  .delete((req, res) => {
    const { password } = req.body;
  });

export default router;
