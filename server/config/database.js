import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const dbPool = mysql
  .createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    database: process.env.DB_NAME || "click_fit",
    password: process.env.DB_PASSWORD || "",
  })
  .promise();

export default dbPool;
