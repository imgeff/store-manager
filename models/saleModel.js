const connection = require('./connection');
const { calculate, subtract, sum } = require('./inventoryProducts');
const { 
  GetAllSales, 
  GetByIdSale, 
  CreateSales, 
  CreateSalesProducts,
  UpdateSalesProducts,
  DeleteSale,
} = require('./querys');

// ================================ GET ALL  ==================================
const getAll = async () => {
  const [allSales] = await connection.execute(GetAllSales);
  return allSales;
};

// ================================ GET BY ID  ==================================
const getById = async (id) => {
  const [saleById] = await connection.execute(GetByIdSale, [id]);
  return saleById;
};

// ================================ CREATE  ==================================
const create = async (sales) => {
  // =============== SUBTRACT QUANTITY PRODUCTS ==============
    await subtract(sales);
  // =============== INSERT TABLE SALES ==============
    const [{ insertId }] = await connection.execute(CreateSales);
  // =============== INSERT TABLE SALES_PRODUCTS ==============
  const createCalls = [];
    await sales.forEach(async ({ productId, quantity }) => {
      const createSales = connection.execute(CreateSalesProducts, [insertId, productId, quantity]);
      createCalls.push(createSales);
    });
    await Promise.all(createCalls);
    return { id: insertId, itemsSold: sales };
};

// ================================ UPDATE  ==================================
const update = async ({ id, products }) => {
  // =============== QUANTITY PRODUCTS ==============
    await calculate(id, products);
  // =============== SALES PRODUCTS ==============
  const updateCalls = [];
  await products.forEach(async ({ productId, quantity }) => {
    const updateSale = connection.execute(UpdateSalesProducts, [productId, quantity, id]);
    updateCalls.push(updateSale);
  });
    await Promise.all(updateCalls);
    return { saleId: id, itemUpdated: products };
};

// ================================ EXCLUDE  ================================== 
const exclude = async (id) => {
  // =============== SUM QUANTITY PRODUCTS ==============
    await sum(id);
  // =============== DELETE SALE TABLE SALES ==============
    await connection.execute(DeleteSale, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};