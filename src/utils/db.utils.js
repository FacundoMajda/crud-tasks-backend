import connectDb from "../config/db.js";

//Pseudo-ORM

const executeQuery = async (query, values = []) => {
  const connection = await connectDb();
  try {
    const [result] = await connection.query(query, values);
    return result;
  } finally {
    await connection.end();
  }
};

export const create = async (table, data) => {
  if (!table || !data) {
    throw new Error('Los parámetros "table" y "data" son requeridos');
  }
  const query = `INSERT INTO ${table} SET ?`;
  const result = await executeQuery(query, [data]);
  console.log(
    `Se ha insertado un nuevo registro en la tabla ${table} con el ID: ${result.insertId}`
  );
  return result;
};

export const findAll = async (table) => {
  if (!table) {
    throw new Error('El parámetro "table" es requerido');
  }
  const query = `SELECT * FROM ${table}`;
  const results = await executeQuery(query);
  console.log(
    `Se han obtenido ${results.length} registros de la tabla ${table}`
  );
  return results;
};

export const findOne = async (table, whereClause, values = []) => {
  if (!table || !whereClause) {
    throw new Error('Los parámetros "table" y "whereClause" son requeridos');
  }
  const query = `SELECT * FROM ${table} WHERE ${whereClause}`;
  const results = await executeQuery(query, values);
  if (results.length > 0) {
    console.log(
      `Se ha encontrado un registro en la tabla ${table} con el ID: ${results[0].id}`
    );
  } else {
    console.log(
      `No se ha encontrado ningún registro en la tabla ${table} que cumpla con la condición: ${whereClause}`
    );
  }
  return results;
};

export const update = async (table, whereClause, values = [], data) => {
  if (!table || !whereClause || !data) {
    throw new Error(
      'Los parámetros "table", "whereClause", y "data" son requeridos'
    );
  }
  const query = `UPDATE ${table} SET ? WHERE ${whereClause}`;
  const result = await executeQuery(query, [data, ...values]);
  console.log(
    `Se ha actualizado el registro con el ID: ${values[0]} en la tabla ${table}. ${result.changedRows} fila(s) afectada(s)`
  );
  return result;
};

export const remove = async (table, whereClause, values = []) => {
  if (!table || !whereClause) {
    throw new Error('Los parámetros "table" y "whereClause" son requeridos');
  }
  const query = `DELETE FROM ${table} WHERE ${whereClause}`;
  const result = await executeQuery(query, values);
  console.log(
    `Se ha eliminado el registro con el ID: ${values[0]} de la tabla ${table}. ${result.affectedRows} fila(s) afectada(s)`
  );
  return result;
};
