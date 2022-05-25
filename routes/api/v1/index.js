const express = require('express');
const router = express.Router();

const categoriesRoutes = require('./categorias');

router.use('/categories', categoriesRoutes);

module.exports = router;
