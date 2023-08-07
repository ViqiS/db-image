require('dotenv').config();
const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.json());

const whiteList = ['http://localhost:3000', 'https://myapp.com'];
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


routerApi(app);
