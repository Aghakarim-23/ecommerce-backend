import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";

const migrate = async () => {
  try {
    await connectDB();

    const result = await mongoose.connection
      .collection("products")
      .updateMany(
        { featured: { $exists: false } },
        { $set: { featured: false } }
      );

    console.log(`${result.modifiedCount} products updated`);

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

migrate();