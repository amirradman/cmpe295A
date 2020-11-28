// const express = require('express');
// const router = express.Router();

// // bring Item model
// const Item = require('../models/Item.js');

// // @route GET api/items
// // @desc Get all Items
// // @access public

// // fetch all items from database 
// router.get('/', (req, res) => {
//     Item.find().then(items => res.json(items))
// })


// // @route POST api/items
// // @desc Create an item
// // @access public

// router.post('/', (req, res) => {
//     const newItem = new Item({
//         name: req.body.name
//     });
//     newItem.save().then(item => res.json(item))
// });


// // @route POST api/items/:id
// // @desc Delete  an item
// // @access public

// router.delete('/:id', (req, res) => {
//     Item.findById(req.params.id).then(
//         item => item.remove()
//             .then(() => res.json({ successful: true }))
//             .catch(err => res.status(404).json({ success: false }))
//     )
// }

// )

// module.exports = router;

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
    question5: req.body.G1question5,

    },
    Graph2:{
    
      question1: req.body.G2question1,
      question2: req.body.G2question2,
      question3: req.body.G2question3,
      question4: req.body.G2question4,
      question5: req.body.G2question5,
  
      },
      Graph3:{
    
        question1: req.body.G3question1,
        question2: req.body.G3question2,
        question3: req.body.G3question3,
        question4: req.body.G3question4,
        question5: req.body.G3question5,
    
        }
    
  })

  Params.save().then(item => res.json(item))
});

// users.findById(ObjectId("5fb4a964c22b34330cd29e55"))
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// users.get('/', (req, res) => {
//   Item.find().then(items => res.json(items))
// })

module.exports = users;