const { Image, ImageSchema } = require('./image.model');
const { User, UserSchema} = require ('./user.model')

function setupModels(sequelize) {
  Image.init(ImageSchema, { sequelize });
  Image.associate(sequelize.models);

  User.init(UserSchema, User.config(sequelize));
  User.associate(sequelize.models);
}

module.exports = setupModels;