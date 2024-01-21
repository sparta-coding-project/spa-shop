import express from "express";
import "dotenv/config";
import productsRouter from "./routes/products.router.js";
import connect from "./schemas/index.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3002;

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("hello"));
app.use("/api", productsRouter);

app.listen(PORT, () => {
  console.log("waiting at port ",PORT);
});
