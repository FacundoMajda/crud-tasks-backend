import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import TaskEntity from "./src/models/task.model.js";
import router from "./src/routes/task.routes.js";

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

async function initModels() {
  await TaskEntity();
}

app.listen(PORT, async () => {
  await initModels();
  console.log(`Servidor ejecutandose en: ${URL}:${PORT}`);
});
