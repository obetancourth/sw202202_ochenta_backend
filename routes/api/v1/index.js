const express = require('express');
const router = express.Router();

const { authorizer } = require('./middlewares/authorizer');

const categoriesRoutes = require('./categorias');

router.use('/categories', authorizer , categoriesRoutes);

module.exports = router;
