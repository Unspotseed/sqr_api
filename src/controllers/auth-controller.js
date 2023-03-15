const {
  validateRegister,
  validateLogin,
} = require('../validators/auth-validators');
const { User } = require('../models');
// const { Op } = require('sequelize');
const createError = require('../utils/create-error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  // First is to validate the data
  //   const { value, error } = validateRegister(req.body); // version 1
  //   if (err) {
  //     throw err;  //throw error everytime เเค่ให้มันไปทำงาน error ใน registerSchema เเทน
  // ไม่ต้อง repeat code

  try {
    const value = validateRegister(req.body);
    const user = await User.findOne({
      where: {
        email: value.email,
      },
    });
    if (user) {
      createError('email is already in use', 400); // create some function like this
    }

    value.password = await bcrypt.hash(value.password, 12); //  12 คือค่าหน่วงเวลาในการ hash call salt
    await User.create(value);

    // console.log(user);
    // select * from user where email = value.email
    /*
    // User.create({firstName, lastName, email, password}) // แปลง value schema ให้มาในรูปเเบบนี้
    //เอาค่า value มาหลังจากการ validate
    User.create({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: bcryp.hash(value.password),
    });
    */

    // res.json(value);
    res.status(201).json({ message: 'register success' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    console.log(value);
    // select  * from user where email = value.email
    const user = await User.findOne({
      where: { email: value.email },
    });

    if (!user) {
      createError('Invalid email or password', 400);
    }

    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError('Invalid email or password', 400);
    }
    //get the user from validate the user
    const accessToken = jwt.sign(
      { id: user.id, roll: user.roll },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user }); // from authenticate
};
