const productModel = require('../models/productModel');

const getAll = async () => {
 const resultgetAll = await productModel.getAll();
  return resultgetAll;
};

const getById = async (id) => {
  const resultgetById = await productModel.getById(id);
  if (!resultgetById.id) return { code: 404, content: { message: 'Product not found' } };
  return { code: 200, content: resultgetById };
};

module.exports = {
  getAll,
  getById,
};