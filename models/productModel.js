const connection = require('./connection');

const getAll = async () => {
  const queryGetAll = 'SELECT * FROM StoreManager.products;';
  const [allProducts] = await connection.execute(queryGetAll);

  return allProducts;
};

const getById = async (id) => {
  const queryGetById = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [productById] = await connection.execute(queryGetById, [id]);

  return productById[0];
};

const create = async ({ name, quantity }) => {
  const queryCreate = 'INSERT INTO StoreManager.products(name, quantity) VALUES(?, ?)';
  const [{ insertId }] = await connection.execute(queryCreate, [name, quantity]);

  return { id: insertId, name, quantity };
};

const update = async ({ id, name, quantity }) => {
  const queryUpdate = `
  UPDATE StoreManager.products
  SET name = ?, quantity = ?
  WHERE id = ?;`;
  await connection.execute(queryUpdate, [name, quantity, id]);
  
  return { id, name, quantity };
};

const exclude = async (id) => {
  const queryDelete = `
  DELETE FROM StoreManager.products
  WHERE id = ?;`;
  await connection.execute(queryDelete, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};