const express = require('express');
const { getAll, getById, create, update, exclude } = require('../controllers/saleController');
// const { saleValidation } = require('../middlewares/saleValidation');
const validationSale = require('../middlewares/validationSale');

const router = express.Router();

// ============== GET ===================

router.get('/:id', getById);

router.get('/', getAll);

// ============== POST ===================

router.post('/', validationSale, create);

// ============== UPDATE ===================

router.put('/:id', validationSale, update);

// ============== DELETE ===================

router.delete('/:id', exclude);

module.exports = router;