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

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 8081, function () {
  console.log(new Date().toISOString() + ": server started on port 8081");
});