const express = require('express');
const { getAll, getById, update, exclude } = require('../controllers/saleController');

const router = express.Router();

// ============== GET ===================

router.get('/:id', getById);

router.get('/', getAll);

// ============== UPDATE ===================

router.put('/:id', update);

// ============== DELETE ===================

router.delete('/:id', exclude);

module.exports = router;