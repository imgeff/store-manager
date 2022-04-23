const saleModel = require('../models/saleModel');
const { validateQuantity } = require('../models/inventoryProducts');
const search = require('../helpers/search');
const { notFound } = require('../data/errorMessage');

const getAll = async () => {
 const resultgetAll = await saleModel.getAll();
  return resultgetAll;
};

const getById = async (id) => {
  const resultgetById = await saleModel.getById(id);
  if (resultgetById.length === 0) return { code: 404, content: notFound('Sale') };
  return { code: 200, content: resultgetById };
};

const create = async (sales) => {
  const resultValidateQuantity = await validateQuantity(sales);
  const saleDenied = { code: 422, content: { message: 'Such amount is not permitted to sell' } };
  if (!resultValidateQuantity) return saleDenied;
  const resultCreate = await saleModel.create(sales);
  return { code: 201, content: resultCreate };
};

const update = async (sale) => {
  const resultUpdate = await saleModel.update(sale);
  return { code: 200, content: resultUpdate };
};

const exclude = async (id) => {
  const resultSearch = await search.sales(false, id);
  if (!resultSearch) return { code: 404, content: { message: 'Sale not found' } };
  
  const resultDelete = await saleModel.exclude(id);
  return { code: 204, content: resultDelete };
};

module.exports = {
  getAll,
  getById,
  update,
  create,
  exclude,
};