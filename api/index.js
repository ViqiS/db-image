require('dotenv').config();
const express = require('express');
const path = require('path');
const routerApi = require('./routes');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler')

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const whiteList = ['http://localhost:3000', 'https://db-image-dev.fl0.io', 'https://image-uploader-project.vercel.app','https://app-login-b.vercel.app' ];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(passport.initialize());

passport.use('local', LocalStrategy);
passport.use(JwtStrategy);

app.use(cors(options));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Manejar solicitudes preflight OPTIONS
app.options('*', cors(options));

app.get('/', (req, res) => {
  res.send('¡Hola!');
});

routerApi(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
