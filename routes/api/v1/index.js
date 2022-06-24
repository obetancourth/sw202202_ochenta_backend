const express = require('express');
const router = express.Router();

const { authorizer } = require('./middlewares/authorizer');
const { jwtAuthorizer } = require('./middlewares/jwtAuthorizer');

const securityRoutes = require('./security');
const categoriesRoutes = require('./categorias');
const cashflowRoutes = require('./cashflow');

router.use('/auth', authorizer, securityRoutes);

router.use('/categories', authorizer, jwtAuthorizer , categoriesRoutes);
router.use('/cashflow', authorizer, jwtAuthorizer, cashflowRoutes);

module.exports = router;
