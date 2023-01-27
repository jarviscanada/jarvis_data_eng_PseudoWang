const router = require('express').Router();

const quoteRoutes = require('./quote-routes');
const traderRoutes = require('./trader-routes.js');
const accountRoute = require('./account-routes');


router.use('/quote', quoteRoutes);
router.use('/traders', traderRoutes);
router.use('/account', accountRoute);

module.exports = router;