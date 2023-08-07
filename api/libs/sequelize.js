require('dotenv').config();
const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'postgres',
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
