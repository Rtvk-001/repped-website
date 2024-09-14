const express = require('express');
const { createProduct, getAllProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/create', createProduct);
router.get('/', getAllProducts);

module.exports = router;
