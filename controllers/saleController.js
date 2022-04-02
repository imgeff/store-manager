const saleService = require('../services/saleService');

const getAll = async (_req, res) => {
  const resultgetAll = await saleService.getAll();
  return res.status(200).json(resultgetAll);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, content } = await saleService.getById(id);

  return res.status(code).json(content);
};

const create = async (req, res) => {
  const { body } = req;
  const { code, content } = await saleService.create(body);
  return res.status(code).json(content);
};

const update = async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  const { code, content } = await saleService.update({ id: Number(id), productId, quantity });

  return res.status(code).json(content);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const { code, content } = await saleService.exclude(Number(id));

  return res.status(code).json(content);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};