const { Image, ImageSchema } = require('./image.model');

function setupModels(sequelize) {
  Image.init(ImageSchema, { sequelize });
  Image.associate(sequelize.models);
}

module.exports = setupModels;