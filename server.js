const express = require('express');
// We will use CORS to enable cross origin domain requests.
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

// start the express
const app = express();


// body-parser middleware
app.use(bodyparser.json())
app.use(cors())
app.use(
  bodyparser.urlencoded({
    extended: false
  })
)

// connect to mongo
mongoose
  .connect('mongodb+srv://amir:dbpassword@cluster.lle8r.mongodb.net/test', { useNewUrlParser: true })
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

const item = require('./routes/routes');
// use Routes
app.use('/routes', item);
app.listen(process.env.PORT || 8081, function () {
  console.log(new Date().toISOString() + ": server started on port 8081");
});