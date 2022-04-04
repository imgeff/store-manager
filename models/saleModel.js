const connection = require('./connection');
const { calculate, subtract, sum } = require('./inventoryProducts');
const { 
  GetAll, 
  GetById, 
  CreateSales, 
  CreateSalesProducts,
  UpdateSalesProducts,
  Delete,
} = require('./querys');

// ================================ GET ALL  ==================================
const getAll = async () => {
  const [allSales] = await connection.execute(GetAll);
  return allSales;
};

// ================================ GET BY ID  ==================================
const getById = async (id) => {
  const [productById] = await connection.execute(GetById, [id]);
  return productById;
};

// ================================ CREATE  ==================================
const create = async (sales) => {
  // =============== SUBTRACT QUANTITY PRODUCTS ==============
    await subtract(sales);
  // =============== INSERT TABLE SALES ==============
    const [{ insertId }] = await connection.execute(CreateSales);
  // =============== INSERT TABLE SALES_PRODUCTS ==============
    await sales.forEach(async ({ productId, quantity }) => {
      await connection.execute(CreateSalesProducts, [insertId, productId, quantity]);
    });
    return { id: insertId, itemsSold: sales };
};

// ================================ UPDATE  ==================================
const update = async ({ id, products }) => {
  // =============== QUANTITY PRODUCTS ==============
    await calculate(id, products);
  // =============== SALES PRODUCTS ==============
  const updateCalls = [];
  await products.forEach(async ({ productId, quantity }) => {
    updateCalls.push(connection.execute(UpdateSalesProducts, [productId, quantity, id]));
  });
    await Promise.all(updateCalls);
    return { saleId: id, itemUpdated: products };
};

// ================================ EXCLUDE  ================================== 
const exclude = async (id) => {
  // =============== SUM QUANTITY PRODUCTS ==============
    await sum(id);
  // =============== DELETE SALE TABLE SALES ==============
    await connection.execute(Delete, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};