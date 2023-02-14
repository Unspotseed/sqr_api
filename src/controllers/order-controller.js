const { Room, AddOn, User, BookingDetail, Booking } = require('../models');
const {
  STATUS_AVAILABLE,
  STATUS_UNAVAILABLE,
  STATUS_HOLDING,
} = require('../config/constant');
const createError = require('../utils/create-error');

exports.createOrder = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(value);
    const room = await Room.findOne({ where: { id: value.roomId } });
    if (room.status !== STATUS_AVAILABLE) {
      createError('Room Unavailable or Holding', 400);
    }

    const result = await Room.update(
      { status: STATUS_HOLDING },
      { where: { id: value.roomId } }
    );
    if (!result) {
      createError('Cannot book room', 400);
    }
    value.userId = req.user.id; // user login
    const booking = await Booking.create(value);

    res.status(201).json(booking);
    // res.status(201).json('1');
    // const roomValue
    //   const user
    // const amountMonth
    // const totalPrice
  } catch (err) {
    next(err);
  }
};
