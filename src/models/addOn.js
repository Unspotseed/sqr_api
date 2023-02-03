module.exports = (sequelize, DataTypes) => {
  const AddOn = sequelize.define(
    'AddOn',
    {
      addOn: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      itemPrice: {
        // type: DataTypes.STRING,
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  AddOn.associate = db => {
    AddOn.hasMany(db.BookingDetails, {
      foreignKey: {
        name: 'addOnId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return AddOn;
};
