const connection = require('./connection');
const { calculate, subtract, sum } = require('./inventoryProducts');

// ================================ GET ALL  ==================================
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

// ================================ GET BY ID  ==================================
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

// ================================ CREATE  ==================================
const create = async (sales) => {
  // =============== SUBTRACT QUANTITY PRODUCTS ==============
    await subtract(sales);
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
    return { id: insertId, itemsSold: sales };
};

// ================================ UPDATE  ==================================
const update = async ({ id, productId, quantity }) => {
  // =============== QUANTITY PRODUCTS ==============
    await calculate(id, productId, quantity);
  // =============== SALES PRODUCTS ==============
    const queryUpdateSalesProducts = `
    UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?;`;
    await connection.execute(queryUpdateSalesProducts, [productId, quantity, id]);
    return { saleId: id, itemUpdated: [{ productId, quantity }] };
};

// ================================ EXCLUDE  ================================== 
const exclude = async (id) => {
  // =============== SUM QUANTITY PRODUCTS ==============
    await sum(id);
  // =============== DELETE SALE TABLE SALES ==============
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