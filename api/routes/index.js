const express = require('express');
const filesRouter = require('./filesImage.router');

const router = express.Router();

// Agrega un mensaje de depuración para verificar que el enrutador de imágenes se está configurando
console.log('Configurando enrutador de imágenes...');
router.use('/filesImage', filesRouter);

module.exports = router;
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/uploadImage', filesRouter);
}

module.exports = routerApi;