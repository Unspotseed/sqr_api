const Joi = require('joi');
const validate = require('./validate');
// validate at the back end

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'any.required': 'first name is required',
    'string.empty': 'First name is required',
    'string.base': 'first name must be a string',
  }),
  lastName: Joi.string().trim().required().messages({
    'any.required': 'last name is required',
    'string.empty': 'Last name is required',
    'string.base': 'Last name must be a string',
  }),
  email: Joi.string().email({ tlds: false }).messages({
    'any.required': 'email is required',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().alphanum().min(8).required().trim().messages({
    'any.required': 'password is required',
    'string.empty': 'Password is required',
    'string.alphanum': 'Password must contain number or alphabet',
    'string.min': 'Password must have at least 8 characters',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .trim()
    .messages({
      'any.only': 'Password and Confirm password did not match',
      'string.empty': 'Confirm password is required',
    })
    .strip(),
});

/*
// create the re use function // version reuse functions
const validate = schema =>
  function (input) {
    const { value, error } = schema.validate(input);
    if (error) {
      throw error;
    }
    return value;
  };
  */

// exports.validateRegister = input => registerSchema.validate(input); version 1
// exports.validateRegister = input => {    // version 2
//   const { value, error } = registerSchema.validate(input);
//   if (error) {
//     throw error;
//   }
// };

exports.validateRegister = validate(registerSchema);

// validate of the login

const loginSchema = Joi.object({
  email: Joi.string().trim().required(), //ค่อย modify message
  password: Joi.string().required(),
});

exports.validateLogin = validate(loginSchema);
