const { Image, ImageSchema } = require('./image.model');

function setupModels(sequelize) {
  Image.init(ImageSchema, Image.config(sequelize));

  Image.associate(sequelize.models);
}

module.exports = setupModels ;