const productModel = require('../models/productModel');

const products = async (name) => {
  const allProducts = await productModel.getAll();
  const duplicates = allProducts.some((product) => product.name === name);
  return duplicates;
};

module.exports = {
  products,
};