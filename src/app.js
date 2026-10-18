import express from "express";
import productRoutes from "./routes/productRoutes.js";


const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "E-commerce API"
  });
});


app.use("/api/products", productRoutes);

export default app;