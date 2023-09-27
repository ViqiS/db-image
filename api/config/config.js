require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'tu_usuario_de_postgres',
    password: process.env.DB_PASSWORD || 'tu_contraseña_de_postgres',
    database: process.env.DB_NAME || 'tu_base_de_datos_de_desarrollo',
    host: process.env.DB_HOST || 'localhost',
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.DB_USER || 'tu_usuario_de_postgres',
    password: process.env.DB_PASSWORD || 'tu_contraseña_de_postgres',
    database: process.env.DB_NAME || 'tu_base_de_datos_de_pruebas',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_USER || 'tu_usuario_de_postgres',
    password: process.env.DB_PASSWORD || 'tu_contraseña_de_postgres',
    database: process.env.DB_NAME || 'tu_base_de_datos_de_produccion',
    host: process.env.DB_HOST || 'tu_host_de_produccion', // Por ejemplo, la dirección de la instancia de PostgreSQL en AWS RDS
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
