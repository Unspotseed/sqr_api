const {
  STATUS_ROLL_USER,
  STATUS_ROLL_GUEST,
  STATUS_ROLL_ADMIN,
} = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roll: {
        type: DataTypes.ENUM(
          STATUS_ROLL_USER,
          STATUS_ROLL_GUEST,
          STATUS_ROLL_ADMIN
        ),
        allowNull: false,
        defaultValue: STATUS_ROLL_USER,
      },
    },
    { underscored: true }
  );

  User.associate = db => {
    User.hasMany(db.Booking, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };
  return User;
};
