const connection = require('./connection');

const getAll = async () => {
  const queryGetAll = `
  SELECT SP.sale_id AS saleId, SP.product_id AS productId, SP.quantity, S.date
  FROM StoreManager.sales_products SP
  INNER JOIN StoreManager.sales S
  ON S.id = SP.sale_id
  ORDER BY SP.sale_id, SP.product_id;`;
  const [allSales] = await connection.execute(queryGetAll);

  return allSales;
};

const getById = async (id) => {
  const queryGetById = `
  SELECT SP.product_id AS productId, SP.quantity, S.date
  FROM StoreManager.sales_products SP
  INNER JOIN StoreManager.sales S
  ON S.id = SP.sale_id
  WHERE SP.sale_id = ?
  ORDER BY SP.sale_id, SP.product_id;`;
  const [productById] = await connection.execute(queryGetById, [id]);
  return productById;
};

const create = async ({ productId, quantity }) => {
  const queryCreate = 'INSERT INTO StoreManager.sales_products(product_id, quantity) VALUES(?, ?)';
  const [{ insertId }] = await connection.execute(queryCreate, [productId, quantity]);

  return { saleId: insertId, productId, quantity };
};

const exclude = async (id) => {
  const queryDelete = `
  DELETE FROM StoreManager.sales
  WHERE id = ?;`;
  await connection.execute(queryDelete, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  exclude,
};