const { Booking } = require('../models');

exports.getOrder = async (req, res, next) => {
  try {
    const booking = await Booking.findAll({});
    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  }
};
