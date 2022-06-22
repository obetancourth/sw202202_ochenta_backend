const express = require('express');
const router = express.Router();

const { authorizer } = require('./middlewares/authorizer');

const categoriesRoutes = require('./categorias');
const cashflowRoutes = require('./cashflow');

router.use('/categories', authorizer , categoriesRoutes);
router.use('/cashflow', authorizer, cashflowRoutes);

module.exports = router;
