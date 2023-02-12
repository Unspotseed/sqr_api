const { AddOn } = require('../models');

exports.getAddOn = async (req, res, next) => {
  try {
    const addOn = await AddOn.findAll({});
    res.status(201).json({ addOn });
  } catch (err) {
    next(err);
  }
};
