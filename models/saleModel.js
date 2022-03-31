const connection = require('./connection');

const getAll = async () => {
  const queryGetAll = `
  SELECT SP.sale_id, SP.product_id, SP.quantity, S.date
  FROM StoreManager.sales_products SP
  INNER JOIN StoreManager.sales S
  ON S.id = SP.sale_id
  ORDER BY SP.sale_id, SP.product_id;`;
  const [allSales] = await connection.execute(queryGetAll);

  return allSales;
};

const getById = async (id) => {
  const queryGetById = `
  SELECT SP.product_id, SP.quantity, S.date
  FROM StoreManager.sales_products SP
  INNER JOIN StoreManager.sales S
  ON S.id = SP.sale_id
  WHERE SP.sale_id = ?
  ORDER BY SP.sale_id, SP.product_id;`;
  const [productById] = await connection.execute(queryGetById, [id]);
  return productById;
};

module.exports = {
  getAll,
  getById,
};