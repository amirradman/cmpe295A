// const express = require('express');
// const mongoose = require('mongoose');
// const bodyparser = require('body-parser');


// const routes = require ('./routes/routes');

// // start the express
// const app = express();

// // body-parser middleware
// app.use(bodyparser.json());


// // connect to mongo
// mongoose.connect('mongodb://localhost/MERNProject')
// .then(()  =>  console.log('Mongodb connected...'))
// .catch(err => console.log(err));


// app.use('/', routes);


// const port = 5000 ;
// app.listen(port,()=>console.log('server start at port'+ ''+port));

// the first part is like import in angular ,which we import packages

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
app.listen(8081, function () {
  console.log(new Date().toISOString() + ": server started on port 8081");
});