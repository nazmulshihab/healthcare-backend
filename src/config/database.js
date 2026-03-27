import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import initModels from "../models/init-models.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",

    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     ca: fs.readFileSync("ca.pem"),
    //   },
    // },

    logging: false,
  },
);

const models = initModels(sequelize);

export { models, sequelize };
