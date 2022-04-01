const productModel = require('../models/productModel');
const verifyDuplicates = require('../helpers/verifyDuplicates');
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
  const resultDuplicates = await verifyDuplicates.products(name);
  if (resultDuplicates) return { code: 409, content: { message: 'Product already exists' } };
  const resultcreate = await productModel.create({ name, quantity });
  return { code: 201, content: resultcreate };
};

module.exports = {
  getAll,
  getById,
  create,
};