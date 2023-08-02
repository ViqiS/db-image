const express = require('express');
const filesRouter = require('./filesImage.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/uploadImage', filesRouter);
}

module.exports = routerApi;