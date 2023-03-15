const express = require('express');

const orderController = require('../controllers/orderStatus-controller');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', orderController.getOrder);
router.get('/admin', orderController.getAllOrder);
router.delete('/:bookingId', orderController.cancelBooking);
router.patch('/available/:roomId', orderController.available);
router.patch('/holding/:roomId', orderController.holding);
router.patch('/unavailable/:roomId', orderController.unavailable);
router.post('/', upload.single('image'), orderController.createOrderRef);

router.patch('/orderAdminSuccess/:bookingId', orderController.orderSuccess);
router.patch('/orderAdminFail/:bookingId', orderController.orderFail);

module.exports = router;
