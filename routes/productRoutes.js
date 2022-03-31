const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/:id', productController.getById);

router.get('/', productController.getAll);

module.exports = router;
