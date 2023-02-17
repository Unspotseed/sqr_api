const express = require('express');

const orderController = require('../controllers/orderStatus-controller');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', orderController.getOrder);
router.delete('/:bookingId', orderController.cancelBooking);
router.post('/', upload.single('image'), orderController.createOrderRef);

module.exports = router;
