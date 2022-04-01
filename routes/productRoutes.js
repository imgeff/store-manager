const express = require('express');
const { getById, getAll, create, update } = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

const router = express.Router();

// ============== GET ===================

router.get('/:id', getById);

router.get('/', getAll);

// ============== POST ===================

router.post('/', productValidation, create);

// ============== PUT ===================

router.put('/:id', productValidation, update);

module.exports = router;
