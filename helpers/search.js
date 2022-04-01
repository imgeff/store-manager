const productModel = require('../models/productModel');

const products = async (name, id) => {
  const allProducts = await productModel.getAll();
  if (name) {
    const resultSearch = allProducts.some((product) => product.name === name);
    return resultSearch;
  }

  const resultSearch = allProducts.some((product) => product.id === id);
  return resultSearch;
};

module.exports = {
  products,
};