import app from "./app.js";
import { sequelize } from "./config/database.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected ✅");
  } catch (error) {
    console.error("DB connection failed ❌", error);
  }
};

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
