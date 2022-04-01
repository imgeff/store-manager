const productModel = require('../models/productModel');
const saleModel = require('../models/saleModel');

const products = async (name, id) => {
  const allProducts = await productModel.getAll();
  if (name) {
    const resultSearch = allProducts.some((product) => product.name === name);
    return resultSearch;
  }

  const resultSearch = allProducts.some((product) => product.id === id);
  return resultSearch;
};

const sales = async (name, id) => {
  const allSales = await saleModel.getAll();
  if (name) {
    const resultSearch = allSales.some((sale) => sale.name === name);
    return resultSearch;
  }

  const resultSearch = allSales.some((sale) => sale.id === id);
  return resultSearch;
};

module.exports = {
  products,
  sales,
};