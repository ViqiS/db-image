require('dotenv').config();
const express = require('express');
const path = require('path');
const routerApi = require('./routes');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler')

const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.json());

const whiteList = ['http://localhost:3000', 'https://db-image-dev.fl0.io', 'https://image-uploader-ahomuqvxl-viqis.vercel.app/' ];
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
  res.send('hola!');
});

routerApi(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


