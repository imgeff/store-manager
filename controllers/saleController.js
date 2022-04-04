const saleService = require('../services/saleService');

const getAll = async (_req, res) => {
  try {   
    const resultgetAll = await saleService.getAll();
    return res.status(200).json(resultgetAll);
  } catch (error) {
    console.error(error.message);
    return res.status(500).end();
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, content } = await saleService.getById(id);
  
    return res.status(code).json(content);
  } catch (error) {
    console.error(error.message);
    return res.status(500).end();
  }
};

const create = async (req, res) => {
  try {
    const { body } = req;
    const { code, content } = await saleService.create(body);
    return res.status(code).json(content);
  } catch (error) {
    console.error(error.message);
    return res.status(500).end();
  }
};

const update = async (req, res) => {
  try {  
    const { id } = req.params;
    const { body } = req;
    const { code, content } = await saleService.update({ id: Number(id), products: body });
  
    return res.status(code).json(content);
  } catch (error) {
    console.error(error.message);
    return res.status(500).end();
  }
};

const exclude = async (req, res) => {
  try {  
    const { id } = req.params;
    const { code, content } = await saleService.exclude(Number(id));

    return res.status(code).json(content);
  } catch (error) {
    console.error(error.message);
    return res.status(500).end();
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};