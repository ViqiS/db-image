const { Model, DataTypes, Sequelize } = require('sequelize');

const IMAGE_TABLE = 'Images';

const ImageSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true, 
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class Image extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: IMAGE_TABLE, // Cambia 'Image' a IMAGE_TABLE
      modelName: 'Image',
    };
  }
}

module.exports = { IMAGE_TABLE, Image, ImageSchema };
