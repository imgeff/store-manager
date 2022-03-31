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

module.exports = {
  getAll,
  getById,
};