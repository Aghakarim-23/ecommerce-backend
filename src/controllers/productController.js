import Product from "../models/Product.js";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

export const getProducts = async (req, res) => {
  try {
    const { search, category, page, limit } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    const currentPage = Number(page) || 1;
    const currentLimit = Number(limit) || 10;
    const skip = (currentPage - 1) * currentLimit;

    const products = await Product.find(filter)
      .skip(skip)
      .limit(currentLimit)
      .sort({ createdAt: -1 });

    const count = await Product.countDocuments(filter);
    res.status(200).json({ products, count });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const product = await Product.create({
      ...req.body,
      image: result.secure_url,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
