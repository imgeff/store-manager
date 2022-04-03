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

const create = async (sales) => {
  // =============== INSERT TABLE SALES ==============

  const queryCreateSales = `
    INSERT INTO StoreManager.sales(date) 
    VALUES(NOW())`;
  const [{ insertId }] = await connection.execute(queryCreateSales);

  // =============== INSERT TABLE SALES_PRODUCTS ==============
  
  await sales.forEach(async ({ productId, quantity }) => {
    const queryCreateSalesProducts = `
    INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) 
    VALUES(?, ?, ?)`;
    await connection.execute(queryCreateSalesProducts, [insertId, productId, quantity]);
  });

  // =============== UPDATE QUANTITY TABLE PRODUCTS ==============
  await sales.forEach(async ({ productId, quantity }) => {
    const queryUpdateQuantity = `
    UPDATE StoreManager.products 
    SET quantity = quantity - ?
    WHERE id = ?;`;
    await connection.execute(queryUpdateQuantity, [quantity, productId]);
  });

  return { id: insertId, itemsSold: sales };
};

const update = async ({ id, productId, quantity }) => {
  // =============== UPDATE TABLE PRODUCTS ==============
  const queryUpdateProduct = `
  UPDATE StoreManager.products
  SET quantity = ?
  WHERE id = ?;`;
  await connection.execute(queryUpdateProduct, [quantity, productId]);

  // =============== UPDATE TABLE SALES PRODUCTS ==============
  const queryUpdateSalesProducts = `
  UPDATE StoreManager.sales_products
  SET product_id = ?, quantity = ?
  WHERE sale_id = ?;`;
  await connection.execute(queryUpdateSalesProducts, [productId, quantity, id]);
  
  return { saleId: id, itemUpdated: [{ productId, quantity }] };
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
  update,
  exclude,
};