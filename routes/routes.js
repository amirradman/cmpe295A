const express = require('express');
const users = express.Router();
const cors = require('cors');


// bring Item model
const User = require('../models/Item.js');
users.use(cors());


users.post('/Save', (req, res) => {
  console.log("this is req.body");
  console.log(req.body.G1question1);
  console.log(req.body.G1question2);
  console.log(req.body.G1question3);
  console.log(req.body.G1question4);
  console.log(req.body.G1question5);


  const Params = new Item({
      Graph1:{
        question1: req.body.G1question1,
        question2: req.body.G1question2,
        question3: req.body.G1question3,
        question4: req.body.G1question4,
        question5: req.body.G1question5
      },
      Graph2:{
        question1: req.body.G2question1,
        question2: req.body.G2question2,
        question3: req.body.G2question3,
        question4: req.body.G2question4,
        question5: req.body.G2question5
      },
      Graph3:{
        question1: req.body.G3question1,
        question2: req.body.G3question2,
        question3: req.body.G3question3,
        question4: req.body.G3question4,
        question5: req.body.G3question5
      }
  })

  Params.save().then(item => res.json(item))
});

module.exports = users;