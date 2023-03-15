const fs = require('fs');
const { Booking, Room, Payment } = require('../models');
const cloudinary = require('../utils/cloudinary');
const {
  STATUS_AVAILABLE,
  STATUS_UNAVAILABLE,
  STATUS_HOLDING,
  STATUS_CONFIRM,
  STATUS_FAIL,
} = require('../config/constant');

exports.getOrder = async (req, res, next) => {
  try {
    const booking = await Booking.findAll({
      where: { userId: req.user.id },
      include: { model: Room },
    });
    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  }
};
// console.log(Booking);

exports.cancelBooking = async (req, res, next) => {
  try {
    const room = await Booking.findOne({
      where: { id: req.params.bookingId },
    });

    await Room.update(
      { status: STATUS_AVAILABLE },
      { where: { id: room.roomId } }
    );

    await Booking.destroy({
      where: { id: req.params.bookingId },
    });
    const bookingUpdateStatus = await Booking.findAll({
      where: { userId: req.user.id },
      include: { model: Room },
    });
    // await Room.update(
    //   { status: STATUS_AVAILABLE },
    //   { where: { id: value.roomId } }
    // );
    // console.log('req.Booking = ', req.params.bookingId);
    // do to re every time when u delete
    // to tell that the states is change
    res.status(201).json({ bookingUpdateStatus });
  } catch (error) {
    next(error);
  }
};

exports.createOrderRef = async (req, res, next) => {
  try {
    // console.log(req.body);
    const value = req.body;

    value.image = await cloudinary.upload(req.file?.path);

    // console.log(value, 'aaaaaaa');
    const createOrder = await Payment.create({
      paymentName: value.paymentName,
      paymentLastName: value.paymentLastName,
      paymentEmail: value.paymentEmail,
      paymentRef: value.paymentRef,
      image: value.image,
      bookingId: value.bookingId,
      // bookingId: {
      //   where: { id: req.params.bookingId },
      // },
    });

    res.status(201).json({ createOrder });
    // res.status(201).json({ createOrder });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.available = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    await Room.update({ status: STATUS_AVAILABLE }, { where: { id: roomId } });
    res.status(201).json({ Message: 'Hi' });
  } catch (err) {
    next(err);
  }
};

exports.holding = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    await Room.update({ status: STATUS_HOLDING }, { where: { id: roomId } });
    res.status(201).json({ Message: 'Hi' });
  } catch (err) {
    next(err);
  }
};

exports.unavailable = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    await Room.update(
      { status: STATUS_UNAVAILABLE },
      { where: { id: roomId } }
    );
    res.status(201).json({ Message: 'Hi' });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const booking = await Booking.findAll({ include: { model: Room } });
    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  }
};

exports.orderSuccess = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    await Booking.update(
      { status: STATUS_CONFIRM },
      { where: { id: bookingId } }
    );

    const room = await Booking.findOne({
      where: { id: req.params.bookingId },
    });
    await Room.update(
      { status: STATUS_UNAVAILABLE },
      { where: { id: room.roomId } }
    );

    res.status(201).json({ Message: 'Hi' });
  } catch (err) {
    next(err);
  }
};

exports.orderFail = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    await Booking.update({ status: STATUS_FAIL }, { where: { id: bookingId } });

    const room = await Booking.findOne({
      where: { id: req.params.bookingId },
    });
    await Room.update(
      { status: STATUS_AVAILABLE },
      { where: { id: room.roomId } }
    );

    res.status(201).json({ Message: 'Hi' });
  } catch (err) {
    next(err);
  }
};
