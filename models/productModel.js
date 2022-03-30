const connection = require('./connection');

const getAll = async () => {
  const queryGetAll = 'SELECT * FROM StoreManager.products;';
  const [allProducts] = await connection.execute(queryGetAll);

  return allProducts;
};

module.exports = {
  getAll,
};