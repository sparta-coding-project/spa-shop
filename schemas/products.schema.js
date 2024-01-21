import mongoose from "mongoose";

const { Schema } = mongoose;

// defaultSchema를 정의합니다.
const productsSchema = new Schema({
  product: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "FOR_SALE"
    },
    password: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

// defaultSchema를 사용하여 'Defaults'라는 이름의 mongoose 모델을 생성합니다.
export default mongoose.model("Products", productsSchema);
