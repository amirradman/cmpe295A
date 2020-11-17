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


users.post('/register', (req, res) => {
  console.log("this is req.body");
  console.log(req.body);

  const Params = new Item({
    question1: req.body.question1,
    question2: req.body.question2,
    // question3: req.body.question3,
    // question4: req.body.question4,
  })

  Params.save().then(item => res.json(item))
});

// users.get('/', (req, res) => {
//   Item.find().then(items => res.json(items))
// })

module.exports = users;