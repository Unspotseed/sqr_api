module.exports = (sequelize, DataType) => {
  const BookingDetails = sequelize.define(
    'BookingDetails',
    {},
    { underscored: true }
  );

  BookingDetails.associate = db => {
    BookingDetails.belongsToMany(db.AddOn, {
      through: 'addOnDetail',
      foreignKey: {
        name: 'AddOnId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    BookingDetails.belongsToMany(db.Booking, {
      through: 'bookingAddOn',
      foreignKey: {
        name: 'BookingId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return BookingDetails;
};
