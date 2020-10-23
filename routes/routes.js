const express = require('express');
const router = express.Router();

// bring Item model
const Item = require('../models/Item.js');

// @route GET api/items
// @desc Get all Items
// @access public

// fetch all items from database 
router.get('/', (req, res) => {
    Item.find().then(items => res.json(items))
})


// @route POST api/items
// @desc Create an item
// @access public

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item))
});


// @route POST api/items/:id
// @desc Delete  an item
// @access public

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id).then(
        item => item.remove()
            .then(() => res.json({ successful: true }))
            .catch(err => res.status(404).json({ success: false }))
    )
}

)

module.exports = router;