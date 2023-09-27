const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const name = Joi.string().max(15);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  name: name.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  name: name,
});

const getUserSchema = Joi.object({
  id: id.required(),
  email: email,
  name: name,
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
