const { Booking, Room, Payment } = require('../models');
const {
  STATUS_AVAILABLE,
  STATUS_UNAVAILABLE,
  STATUS_HOLDING,
} = require('../config/constant');

exports.getOrder = async (req, res, next) => {
  try {
    const booking = await Booking.findAll({
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
    const value = req.body;
    const createOrder = await Payment.create({
      paymentName: value.paymentName,
      paymentLastName: value.email,
      paymentEmail: value.paymentEmail,
      paymentRef: value.paymentRef,
      image: value.image,
      bookingId: {
        where: { id: req.params.bookingId },
      },
    });

    res.status(201).json({ createOrder });
  } catch (err) {
    next(err);
  }
};
