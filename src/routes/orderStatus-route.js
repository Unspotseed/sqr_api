const express = require('express');

const orderController = require('../controllers/orderStatus-controller');

const router = express.Router();

router.get('/', orderController.getOrder);
router.post('/', orderController.createOrderRef);
router.delete('/:bookingId', orderController.cancelBooking);

module.exports = router;
