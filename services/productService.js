const productModel = require('../models/productModel');
const search = require('../helpers/search');
const { notFound } = require('../data/errorMessage');

const getAll = async () => {
 const resultgetAll = await productModel.getAll();
  return resultgetAll;
};

const getById = async (id) => {
  const resultgetById = await productModel.getById(id);
  if (resultgetById === undefined) return { code: 404, content: notFound('Product') };
  return { code: 200, content: resultgetById };
};

const create = async ({ name, quantity }) => {
  const resultSearch = await search.products(name);
  if (resultSearch) return { code: 409, content: { message: 'Product already exists' } };
  const resultcreate = await productModel.create({ name, quantity });
  return { code: 201, content: resultcreate };
};

const update = async ({ id, name, quantity }) => {
  const resultSearch = await search.products(false, id);
  if (!resultSearch) return { code: 404, content: { message: 'Product not found' } };
  const resultUpdate = await productModel.update({ id, name, quantity });
  return { code: 200, content: resultUpdate };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};