const boom  = require('@hapi/boom');
const { models } = require('../libs/sequelize')

class ImageService {
  constructor() {}

  async create(data) {
    const newImage = await models.Image.create({
      name: data.name,
      image: `https://db-image-dev.fl0.io/api/v1/uploads/${data.image}`,
    });
  
    return newImage;
  }
  
  async find() {
    try {
      const rta = await models.Image.findAll();
      return rta;
    } catch (error) {
      console.error('Error en la consulta find():', error);
      throw new Error('Error en la consulta find(): ' + error.message);
    }
  }
  
  

async findOne(id) {
  const image = await models.Image.findByPk(id);
  if(!image) {
    throw boom.notFound('Image not found');
  }
  return image;
}

async delete(id) {
  const image = await this.findOne(id);
  await image.destroy();
  return { id };
}
}

module.exports = ImageService;