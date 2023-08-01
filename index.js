const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/' , (req, res) => {
  res.setEncoding('hola!');
})

app.listen(port, () => {
  console.log('Mi puerto ' + port);
})

routerApi(app);