require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const path = require('path');
const { client } = require("./db");

const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/api', routes);

app.use(express.static(path.join(__dirname, "client", "build")))

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});