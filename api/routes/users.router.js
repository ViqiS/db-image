const express = require('express');
const UserService = require('../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
validatorHandler(getUserSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
  try {
    const userData = req.body; // Obtener los datos del cuerpo de la solicitud
    const newUser = await service.create(userData); // Llamar al método create del servicio de usuario para crear el usuario
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
validatorHandler(updateUserSchema, 'params'),
(req, res, next ) => {
  try {
    const {id} = req.params;
    res.json({
      message: 'update'
    })
  } catch(error) {
    next(error);
  }
});

router.delete('/:id',
validatorHandler(getUserSchema, 'params'),
async (req, res , next ) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({id});
  }catch(error) {
    next(error);
  }
});

module.exports = router;
