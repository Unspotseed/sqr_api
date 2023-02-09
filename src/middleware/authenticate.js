const createError = require('../utils/create-error');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      createError('You are unauthorized', 401);
    }

    const token = authorization.split(' ')[1];
    // เอาค่า  Bearer มา split ด้วย " " ตรง  Bearer ที่เป็นช่องว่าง "Bearer "admpkmasdpfkapsdf <=[1] index ที่ 1 หลังจาก split
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY); // => มาจากที่มาจากตอน sign gentoken ตอน login
    const user = await User.findOne({
      where: { id: payload.id },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      createError('You are unauthorized', 401);
    }
    req.user = user; // หาค่า user เขาไปใน req object
    next();
  } catch (err) {
    next(err);
  }
};
