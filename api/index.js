const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());

const whiteList = ['http://localhost:3001', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)|| !origin) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  }
}
app.use(cors(options));



app.get('/api' , (req, res) => {
  res.send('hola!');
})

app.listen(port, () => {
  console.log('Mi puerto ' + port);
})

routerApi(app);