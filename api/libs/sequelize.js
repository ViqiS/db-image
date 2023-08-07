require('dotenv').config();
const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}


setupModels(sequelize);

module.exports = sequelize;
