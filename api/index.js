require('dotenv').config();
const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler')

const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.json());

const whiteList = ['http://localhost:3000', 'https://db-image-dev.fl0.io'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('hola!');
});

// Agrega un mensaje de depuración para verificar que las rutas están siendo configuradas correctamente
console.log('Configurando rutas...');
routerApi(app);

// Agrega un mensaje de depuración para verificar que el middleware errorHandler está funcionando
console.log('Agregando el middleware errorHandler...');
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


