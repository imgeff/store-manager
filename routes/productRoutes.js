const express = require('express');
const { getById, getAll, create } = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

const router = express.Router();

router.get('/:id', getById);

router.get('/', getAll);

router.post('/', productValidation, create);

module.exports = router;
