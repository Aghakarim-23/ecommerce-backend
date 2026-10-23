import express from "express";
import { createProduct, getProducts, getProductById } from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);
router.get("/:id", getProductById);


export default router;