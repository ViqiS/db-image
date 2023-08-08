const express = require('express');
const ImageService = require('../services/image.service');
const { createImageSchema, getImageSchema } = require('../schemas/image.schema');
const validatorHandler = require('../middlewares/validator.handler');
const multer = require('multer');
const upload = multer ({ dest: 'uploads/'});

const router = express.Router();
const service = new ImageService();

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

/* router.post('/',
  validatorHandler(createImageSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newImage = await service.create(body);
    res.status(201).json({
      message: 'Imagen cargada desde URL y entrada en la base de datos creada con éxito',
      newImage,
    });
  } catch (error) {
    next(error);
  }
}); */
router.post('/', upload.single('image'), async function (req, res) {
  console.log('Petición POST recibida en /filesImage');
  
  const nameImage = req.body.name;
  const imageData = req.file;

  console.log('Nombre de la imagen:', nameImage);
  console.log('Datos de la imagen:', imageData);

  try {
    const newImage = await service.create({ name: nameImage, image: imageData.filename });
    console.log('Nueva imagen creada en la base de datos:', newImage);
    res.status(201).json({ nameImage, imageData, newImage });
  } catch (error) {
    console.error('Error al crear nueva imagen:', error);
    res.status(500).json({ error: 'Error al crear nueva imagen' });
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
