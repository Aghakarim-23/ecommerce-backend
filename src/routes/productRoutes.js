import express from "express";
import { createProduct, getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);


export default router;