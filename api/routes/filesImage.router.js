const express = require('express');
const ImageService = require('../services/image.service');
const { createImageSchema, getImageSchema } = require('../schemas/image.schema');
const validatorHandler = require('../middlewares/validator.handler');


const router = express.Router();
const service = new ImageService();

router.get('/', async (req, res, next) => {
  try {
    const images = await service.find();
    res.json(images);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
validatorHandler(getImageSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await service.findOne(id);
    res.json(image);
  } catch (error) {
    next(error);
  }
});

router.post('/', 
  validatorHandler(createImageSchema, 'body'),
  async (req, res, next) => {
  try {
    const imageData = req.body;
    const newImage = await service.create(imageData);
    res.status(201).json(newImage);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getImageSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({id});
  } catch (error) {
    next(error);
  }
});

module.exports = router;