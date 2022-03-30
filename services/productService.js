const productModel = require('../models/productModel');

const getAll = async () => {
 const resultgetAll = await productModel.getAll();
  return resultgetAll;
};

module.exports = {
  getAll,
};