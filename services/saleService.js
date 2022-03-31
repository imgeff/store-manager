const saleModel = require('../models/saleModel');
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

module.exports = {
  getAll,
  getById,
};