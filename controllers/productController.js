const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const resultgetAll = await productService.getAll();
  return res.status(200).json(resultgetAll);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, content } = await productService.getById(id);

  return res.status(code).json(content);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, content } = await productService.create({ name, quantity });

  return res.status(code).json(content);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { code, content } = await productService.update({ id: Number(id), name, quantity });

  return res.status(code).json(content);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const { code, content } = await productService.exclude(Number(id));

  return res.status(code).json(content);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};