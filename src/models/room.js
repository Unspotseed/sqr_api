const {
  STATUS_AVAILABLE,
  STATUS_UNAVAILABLE,
  STATUS_HOLDING,
} = require('../config/constant');
const apartment = require('./apartment');

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      room: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      status: {
        type: DataTypes.ENUM(
          STATUS_AVAILABLE,
          STATUS_HOLDING,
          STATUS_UNAVAILABLE
        ),
        allowNull: false,
        defaultValue: STATUS_AVAILABLE,
      },
      // priceRoom: DataTypes.INTEGER,
      priceRoom: DataTypes.INTEGER,
      floor: DataTypes.INTEGER,
    },
    { underscored: true }
  );

  Room.associate = db => {
    Room.belongsTo(db.Apartment, {
      foreignKey: {
        name: 'apartId',
        // allowNull: false,
        // defaultValue: 'The mont Tower',
      },
      onDelete: 'RESTRICT',
    });

    Room.hasMany(db.Booking, {
      foreignKey: {
        name: 'roomId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };
  return Room;
};
