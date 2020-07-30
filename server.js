const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


const routes = require ('./routes/routes');

// start the express
const app = express();

// body-parser middleware
app.use(bodyparser.json());


// connect to mongo
mongoose.connect('mongodb://localhost/MERNProject')
.then(()  =>  console.log('Mongodb connected...'))
.catch(err => console.log(err));


app.use('/', routes);


const port = 5000 ;
app.listen(port,()=>console.log('server start at port'+ ''+port));