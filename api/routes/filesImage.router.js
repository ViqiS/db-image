const express = require('express');
const multer = require('multer');

const ImageService = require('../services/image.service');
const { createImageSchema, getImageSchema } = require('../schemas/image.schema');
const validatorHandler = require('../middlewares/validator.handler');

const { join, extname } = require ('path');
const MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const multerUpload = multer({
  storage: multer.diskStorage( {
    destination: join(__dirname, '../uploads'),
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname)
      const fileNameParts = file.originalname.split(' ');
      const firstWord = fileNameParts.shift();
      const fileName = firstWord || file.originalname;
      cb(null, `${fileName}${fileExtension}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if(MIMETYPES.includes(file.mimetype)) cb(null, true)
    else cb(new Error(`Solo ${MIMETYPES.join(' ', 'Esa extension no está permitida')}`))
  },
  limits: {
    fieldSize: 10000000,
  },
})

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
  multerUpload.single('image'),
  validatorHandler(createImageSchema, 'newImage'),
  async (req , res, next ) => { 
  try {
    console.log('Archivo recibido:', req.file);
    console.log('Ruta en el servidor:', req.file.path);
    const name = req.file.fieldname;
    const image = req.file.path;
    const newImage = await service.create({
      name: name,
      image: image,
    })

    res.status(201).json({
      message: 'Imagen cargada con éxito',
      newImage,
    })
  } catch(error) {
    next(error)
  }
});

/* PARA QUE EL CLIENTE MODIFIQUE EL NOMBRE (ver)
const newName = req.body.newName; // Obtén el nuevo nombre del cuerpo de la solicitud
    const image = req.file;

    const newImage = await service.create({ name: newName, image: image.filename });

    res.status(201).json({ newName, image: newImage });
*/

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
