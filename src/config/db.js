import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(chalk.green("MongoDB connected ✅"));
  } catch (error) {
    console.error(
      chalk.red("MongoDB connection error:", error.message)
    );

    process.exit(1);
  }
};

export default connectDB;