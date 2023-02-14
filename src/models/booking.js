const {
  STATUS_CONFIRM,
  STATUS_FAIL,
  STATUS_PENDING,
} = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    order: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    timeStart: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    timeEnd: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    totalPrice: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM(STATUS_FAIL, STATUS_CONFIRM, STATUS_PENDING),
      allowNull: false,
      defaultValue: STATUS_PENDING,
    },
  });

  Booking.associate = db => {
    Booking.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    Booking.belongsTo(db.Room, {
      foreignKey: {
        name: 'roomId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    Booking.hasMany(db.BookingDetails, {
      foreignKey: {
        name: 'BookingId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    Booking.hasMany(db.Payment, {
      foreignKey: {
        name: 'bookingId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Booking;
};
