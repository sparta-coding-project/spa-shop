import express from "express";
import "dotenv/config";
import productsRouter from "./routes/products.router.js";
import connect from "./schemas/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("hello"));
app.use("/api", productsRouter);

app.listen(process.env.PORT, () => {
  console.log("waiting at port 3000");
});
