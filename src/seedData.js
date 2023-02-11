// const { Room, sequelize } = require('../models');

// let roomData = [{ room: '101', price_room: 300 }];

// const seedData = async () => {
//   try {
//     await sequelize.sync({ force: true });
//     let room_res = await Room.bulkCreate(roomData);
//   } catch (err) {
//     console.log(err);
//   }
// };

// seedData();

/*

const { Room, sequelize } = require('../src/models');

let roomData = [
  { room: '101', priceRoom: 3000, floor: 1 },
  { room: '102', priceRoom: 3000, floor: 1 },
  { room: '103', priceRoom: 3000, floor: 1 },
  { room: '104', priceRoom: 3000, floor: 1 },
  { room: '105', priceRoom: 3000, floor: 1 },
  { room: '106', priceRoom: 3000, floor: 1 },
  { room: '107', priceRoom: 3000, floor: 1 },
  { room: '108', priceRoom: 3000, floor: 1 },

  { room: '201', priceRoom: 3000, floor: 2 },
  { room: '202', priceRoom: 3000, floor: 2 },
  { room: '203', priceRoom: 3000, floor: 2 },
  { room: '204', priceRoom: 3000, floor: 2 },
  { room: '205', priceRoom: 3000, floor: 2 },
  { room: '206', priceRoom: 3000, floor: 2 },
  { room: '207', priceRoom: 3000, floor: 2 },
  { room: '208', priceRoom: 3000, floor: 2 },

  { room: '301', priceRoom: 3000, floor: 3 },
  { room: '302', priceRoom: 3000, floor: 3 },
  { room: '303', priceRoom: 3000, floor: 3 },
  { room: '304', priceRoom: 3000, floor: 3 },
  { room: '305', priceRoom: 3000, floor: 3 },
  { room: '306', priceRoom: 3000, floor: 3 },
  { room: '307', priceRoom: 3000, floor: 3 },
  { room: '308', priceRoom: 3000, floor: 3 },

  { room: '401', priceRoom: 3000, floor: 4 },
  { room: '402', priceRoom: 3000, floor: 4 },
  { room: '403', priceRoom: 3000, floor: 4 },
  { room: '404', priceRoom: 3000, floor: 4 },
  { room: '405', priceRoom: 3000, floor: 4 },
  { room: '406', priceRoom: 3000, floor: 4 },
  { room: '407', priceRoom: 3000, floor: 4 },
  { room: '408', priceRoom: 3000, floor: 4 },

  { room: '501', priceRoom: 3000, floor: 5 },
  { room: '502', priceRoom: 3000, floor: 5 },
  { room: '503', priceRoom: 3000, floor: 5 },
  { room: '504', priceRoom: 3000, floor: 5 },
  { room: '505', priceRoom: 3000, floor: 5 },
  { room: '506', priceRoom: 3000, floor: 5 },
  { room: '507', priceRoom: 3000, floor: 5 },
  { room: '508', priceRoom: 3000, floor: 5 },
];

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });
    let room_res = await Room.bulkCreate(roomData);
  } catch (err) {
    console.log(err);
  }
};

seedData();

*/

/*

const { AddOn, sequelize } = require('../src/models');

let addOnData = [
  { addOn: 'Air conditioner', itemPrice: 200 },
  { addOn: 'Fan', itemPrice: 50 },
  { addOn: 'Bed', itemPrice: 100 },
  { addOn: 'Microwave', itemPrice: 100 },
];

const addOnSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    let addOn_res = await AddOn.bulkCreate(addOnData);
  } catch (err) {
    console.log(err);
  }
};

addOnSeed();

*/
