const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(15);
const image = Joi.string();

const createImageSchema = Joi.object({
  name: name.required(),
  image: image.required(),
})

const getImageSchema = Joi.object({
  id: id.required(),
  name: name,
})

module.exports = { createImageSchema, getImageSchema };