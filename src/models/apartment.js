const { STATUS_UNAVAILABLE, STATUS_AVAILABLE } = require('../config/constant');
const user = require('./user');

module.exports = (sequelize, DataTypes) => {
  const Apartment = sequelize.define('Apartment', {
    apartment: {
      type: DataTypes.STRING,

      allowNull: false,
    },
    floor: {
      // type: DataTypes.STRING,

      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(STATUS_AVAILABLE, STATUS_UNAVAILABLE),
      allowNull: false,
      defaultValue: STATUS_AVAILABLE,
    },
  });

  Apartment.associate = db => {
    Apartment.hasMany(db.Room, {
      foreignKey: {
        name: 'apartId',
        // defaultValue: '1',
      },
      onDelete: 'RESTRICT',
    });
  };
  return Apartment;
};
