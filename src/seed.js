import mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);



await Product.updateMany({}, [
  {
    $set: {
      category: { $toLower: "$category" },
    },
  },
  
],
 {
    updatePipeline: true
  });

console.log("All products category names updated!");

await mongoose.disconnect();