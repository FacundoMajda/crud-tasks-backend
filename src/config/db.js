import "dotenv/config";
import { Sequelize } from "sequelize";
import { environment } from "./environment.js";

const sequelize = new Sequelize(
  environment.database.name,
  environment.database.user,
  environment.database.password,
  {
    host: environment.database.host,
    dialect: "mysql",
  }
);

export async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("## DB Conectada. ##");
    await sequelize.sync(); // { force: true }
  } catch (error) {
    console.error("No se pudo conectar:", error);
  }
}
export default sequelize;
