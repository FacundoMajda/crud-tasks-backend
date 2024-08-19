import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    console.log("datos de entrada invalidos para la creacion de la task.");
    return res.status(400).json({
      error: "los campos title y description son requeridos.",
    });
  }
  try {
    const result = await Task.create({ title, description });
    console.log(`task con id: ${result.id} creada.`);
    return res.status(201).json({
      status: result.StatusCode,
      message: result.StatusDescription,
      data: result.Content,
    });
  } catch (error) {
    console.error("error al crear task: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    console.log("tasks obtenidas: ", tasks.length);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("error al obtener tasks: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    console.log("id de task no proporcionado.");
    return res.status(400).json({ error: 'el campo "id" es requerido' });
  }

  try {
    const task = await Task.findByPk(id);
    task
      ? (console.log(`task obtenida exitosamente. id: ${task.id}`),
        res.status(200).json(task))
      : (console.log(`no se encontro task con id ${id}`),
        res.status(404).json({ error: "task no encontrada" }));
  } catch (error) {
    console.error(`error al obtener task con id ${id}: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, done } = req.body;
  if (!title || !description) {
    console.log("datos de entrada invalidos para la actualizacion de la task.");
    return res.status(400).json({
      error: "los campos title y description son requeridos.",
    });
  }

  try {
    const [updated] = await Task.update(
      { title, description, done },
      {
        where: { id },
      }
    );
    updated
      ? (console.log(`task actualizada exitosamente. id: ${id}`),
        res.status(200).json({ message: "task actualizada" }))
      : (console.log(`no se efectuaron cambios en la task con id ${id}.`),
        res.status(404).json({ error: "no se efectuaron cambios en la task" }));
  } catch (error) {
    console.error(`error al actualizar task con id ${id}: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    console.log("id de task no proporcionado.");
    return res.status(400).json({ error: 'el campo "id" es requerido' });
  }

  try {
    const result = await Task.destroy({
      where: { id },
    });
    result.rowDeleted === 1
      ? (console.log(`task eliminada exitosamente. id: ${id}`),
        res.status(200).json({ message: "task eliminada" }))
      : (console.log(`no se encontro task con id ${id} para eliminar`),
        res.status(404).json({ error: "task no encontrada" }));
  } catch (error) {
    console.error(`error al eliminar task con id ${id}: `, error.message);
    return res.status(500).json({ error: error.message });
  }
};
