const express = require('express');

const orderController = require('../controllers/orderStatus-controller');

const router = express.Router();

router.get('/', orderController.getOrder);

module.exports = router;
