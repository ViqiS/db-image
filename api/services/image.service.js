const boom  = require('@hapi/boom');
const { models } = require('../libs/sequelize')

class ImageService {
  constructor() {}

  async create(data) {
    const newImage = await models.Image.create({
      ...data,
    });
    return newImage;
  }
  async find() {
    const rta = await models.Image.findAll();
    return rta;
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