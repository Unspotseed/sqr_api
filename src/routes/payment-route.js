const express = require('express');

const paymentController = require('../controllers/order-controller');
const addOnController = require('../controllers/addOn-controller');
const router = express.Router();

router.get('/', addOnController.getAddOn);
router.post('/', paymentController.createOrder);

module.exports = router;
