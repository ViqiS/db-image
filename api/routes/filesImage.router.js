const express = require('express');
const multer = require('multer');
const path = require('path');
const ImageService = require('../services/image.service');
const { createImageSchema, getImageSchema } = require('../schemas/image.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new ImageService();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Carpeta donde se almacenarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

router.get('/', async (req, res, next) => {
  try {
    console.log('Obteniendo imágenes...');
    const images = await service.find();
    console.log('Imágenes encontradas:', images);
    res.json(images);
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
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

router.post(
  '/',
  validatorHandler(createImageSchema, 'body')(req, res, next),
  multer({ storage }).single('image'),
  async (req, res, next) => {
    try {
      const { filename } = req.file;
      const { originalname } = req.file;
      
      // Crear la entrada en la base de datos con el nombre y la URL de la imagen
      const newImage = await service.create({ name: originalname, image: filename });
      const imageUrl = `https://db-image-dev.fl0.io/api/v1/uploads/${filename}`;

      res.status(201).json({
        message: 'Imagen cargada y entrada en la base de datos creada con éxito',
        filename,
        imageUrl,
        newImage,
      });
    } catch (error) {
      next(error);
    }
  }
);


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