import express from "express";
import Products from "../schemas/products.schema.js";

const router = express.Router();

router
  .route("/products")
  .get(async (req, res, next) => {
    try {
      // 몽고디비 데이터 가져오기
      const products = await Products.find({});
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
  .get(async (req, res, next) => {
    try {
      const { productId } = req.params;
      const specificProduct = await Products.find({ _id: productId });
      return res.status(200).json({ product: specificProduct });
    } catch (error) {
      console.error(error);
      next();
    }
  })
  .patch(async (req, res, next) => {
    try {
      const productId = req.params;
      const { title, content, author, password } = req.body;
      console.log([title, content])
      const updateData = {
        $set: {
            "product": {
              "title": title,
              "content": content,
            },
        },
      };
      const updateProduct = await Products.updateOne({ _id: productId }, updateData);
      return res.status(201).send("변경되었습니다.")
    } catch (error) {
      console.error(error);
      next();
    }
  })
  .delete(async (req, res) => {
    try{
        const { productId } = req.params;
        const { password } = req.body;
        const specificProduct = await Products.findOne({_id: productId});
        console.log(specificProduct)
        console.log(password === specificProduct.product.password)
        if (password === specificProduct.product.password){
            await Products.deleteOne({ _id: productId });
            return res.status(201).send("Removed successfully")
        }
        return res.status(401).send('data error')
    }catch(error){
        console.error(error);
    }
  });

// router.route('/users/:userId')
//   .get(async (req, res) => {
//     const {userId} = req.params;
//     const specificUser = 
//   })

export default router;
