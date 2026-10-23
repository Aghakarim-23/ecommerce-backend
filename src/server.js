import app from "./app.js";
import chalk from "chalk";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();


const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(chalk.green(`Server running on port ${PORT}`));
});
