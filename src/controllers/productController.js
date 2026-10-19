import Product from "../models/Product.js";



export const getProducts = async (req, res) => {
    try {

    const {category, page, limit} = req.query;

        const currentPage = Number(page) || 1;
    const currentLimit = Number(limit) || 10;

    const skip = (currentPage - 1) * currentLimit;

    let products;

    const count = await Product.countDocuments();

    if (category && category !== "all") {
      products = await Product.find({ category }).skip(skip).limit(currentLimit);
    } else {
      products = await Product.find().skip(skip).limit(currentLimit) ;
    }

    res.status(200).json({
      products,
      count
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}