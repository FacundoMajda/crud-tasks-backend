import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import TaskEntity from "./src/models/task.model.js";
import router from "./src/routes/task.routes.js";
import { initDb } from "./src/config/db.js";

const app = express();

const URL = process.env.BACKEND_URL;
const PORT = process.env.BACKEND_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(helmet());

app.use("/api", router);

app.use("/", (req, res) => {
  res.send("Hola Mundo!");
});

app.use((req, res) => {
  res.status(404).send("404 - No encontrado");
});

app.listen(PORT, async () => {
  try {
    await initDb();
    console.log(`Servidor ejecutándose en: ${URL}:${PORT}`);
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    process.exit(1); // Exit the process with an error code
  }
});
