import "dotenv/config";
import mysql from "mysql2/promise"; //promise para asincronia

const connectDb = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });

  return connection;
};

export default connectDb;
