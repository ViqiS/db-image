require('dotenv').config();
module.exports = {
  development: {
    url: process.env.DATABASE_URL, // Accede a la variable de entorno DATABASE_URL
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL, // Accede a la variable de entorno DATABASE_URL
    dialect: 'postgres',
  }
}

