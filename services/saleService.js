const saleModel = require('../models/saleModel');

const getAll = async () => {
 const resultgetAll = await saleModel.getAll();
  return resultgetAll;
};

// const getById = async (id) => {
//   const resultgetById = await productModel.getById(id);
//   if (resultgetById === undefined) return { code: 404, content: { message: 'Product not found' } };
//   return { code: 200, content: resultgetById };
// };

module.exports = {
  getAll,
  // getById,
};