const express = require('express');
const { getById, getAll, create, update, exclude } = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

const router = express.Router();

// ============== GET ===================

router.get('/:id', getById);

router.get('/', getAll);

// ============== POST ===================

router.post('/', productValidation, create);

// ============== PUT ===================

router.put('/:id', productValidation, update);

// ============== DELETE ===================

router.delete('/:id', exclude);

module.exports = router;
