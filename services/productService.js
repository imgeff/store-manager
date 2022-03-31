const productModel = require('../models/productModel');
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

module.exports = {
  getAll,
  getById,
};