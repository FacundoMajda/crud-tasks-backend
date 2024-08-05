import connectDb from "../config/db.js";

const TaskEntity = async () => {
  const connection = await connectDb();
  const sql = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT,
      title VARCHAR(100),
      description VARCHAR(100),
      done BOOLEAN DEFAULT false,
      PRIMARY KEY(id)
    )
  `;

  await connection.execute(sql);
  console.log("La tabla de tareas ha sido creada o ya existía.");
};

export default TaskEntity;
