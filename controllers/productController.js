const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const resultgetAll = await productService.getAll();
  return res.status(200).json(resultgetAll);
};

// const getById = async (id) => {
//   const resultgetById = await productModel.getById(id);
//   if (!resultgetById.id) return { code: 404, content: { message: 'Product not found' } };
//   return { code: 200, content: resultgetById };
// };

module.exports = {
  getAll,
  // getById,
};