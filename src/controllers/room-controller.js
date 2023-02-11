const { Room } = require('../models');

exports.getRoom = async (req, res, next) => {
  try {
    const rooms = await Room.findAll({});
    res.status(201).json({ rooms });
  } catch (err) {
    next(err);
  }
};
