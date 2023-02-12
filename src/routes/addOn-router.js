const express = require('express');

const addOnController = require('../controllers/addOn-controller');

const router = express.Router();

router.get('/', addOnController.getAddOn);

module.exports = router;
