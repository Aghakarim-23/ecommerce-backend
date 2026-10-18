import app from "./app.js";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;


const server = app.listen(PORT, () => {
  console.log(chalk.green(`Server running on port ${PORT}`));
});

server.on("error", (error) => {
  console.error("Server error:", error);
});