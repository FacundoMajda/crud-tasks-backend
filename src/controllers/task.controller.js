import { create, findOne, findAll, update, remove } from "../utils/db.utils.js";

export const createTask = async (req, res) => {
  console.log("creando una nueva task...");
  const { title, description, done } = req.body;
  if (!title || !description) {
    console.log("datos de entrada invalidos para la creacion de la task.");
    return res.status(400).json({
      error: 'los campos title y description son requeridos.',
    });
  }
  try {
    const Task = await create("tasks", req.body);
    console.log(`task con id: ${Task.insertId} creada.`);
    return res.status(201).json({ message: "task creada: ", Task });
  } catch (error) {
    console.error("error al crear task: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  console.log("obteniendo todas las tasks...");
  try {
    const Tasks = await findAll("tasks");
    console.log("tasks obtenidas: ", Tasks.length);
    return res.status(200).json({ Tasks });
  } catch (error) {
    console.error("error al obtener tasks: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getTask = async (req, res) => {
  console.log("obteniendo una task especifica...");
  const { id } = req.params;
  if (!id) {
    console.log("id de task no proporcionado.");
    return res.status(400).json({ error: 'el campo "id" es requerido' });
  }

  try {
    const Task = await findOne("tasks", `id = ?`, [id]);
    Task.length > 0
      ? (console.log(`task obtenida exitosamente. id: ${Task[0].id}`),
        res.status(200).json({ Task }))
      : (console.log(`no se encontro task con id ${id}`),
        res.status(404).json({ error: "task no encontrada" }));
  } catch (error) {
    console.error(`error al obtener task con id ${id}: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  console.log("actualizando una task especifica...");
  const { id } = req.params;
  const { title, description, done } = req.body;
  if (!title || !description) {
    console.log("datos de entrada invalidos para la actualizacion de la task.");
    return res.status(400).json({
      error: 'los campos title  y description  son requeridos.',
    });
  }

  try {
    const Task = await update("tasks", `id = ?`, [id], req.body);
    Task.changedRows > 0
      ? (console.log(`task actualizada exitosamente. id: ${id}`),
        res.status(200).json({ message: "task actualizada: ", Task }))
      : (console.log(`no se efectuaron cambios en la task con id ${id}.`),
        res.status(404).json({ error: "no se efectuaron cambios en la task" }));
  } catch (error) {
    console.error(`error al actualizar task con id ${id}: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  console.log("eliminando una task especifica...");
  const { id } = req.params;
  if (!id) {
    console.log("id de task no proporcionado.");
    return res.status(400).json({ error: 'el campo "id" es requerido' });
  }

  try {
    const Task = await remove("tasks", `id = ?`, [id]);
    Task.affectedRows > 0
      ? (console.log(`task eliminada exitosamente. id: ${id}`),
        res.status(200).json({ message: "task eliminada: ", Task }))
      : (console.log(`no se encontro task con id ${id} para eliminar`),
        res.status(404).json({ error: "task no encontrada" }));
  } catch (error) {
    console.error(`error al eliminar task con id ${id}: `, error.message);
    return res.status(500).json({ error: error.message });
  }
};
