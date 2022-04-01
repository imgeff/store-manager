const express = require('express');
const { getAll, getById, exclude } = require('../controllers/saleController');

const router = express.Router();

// ============== GET ===================

router.get('/:id', getById);

router.get('/', getAll);

// ============== DELETE ===================

router.delete('/:id', exclude);

module.exports = router;