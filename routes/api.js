const express = require ('express');
const router = express.Router();
const { client } = require("../db");

router.get('/todos', (req, res, next) => {

  const todos = client.db("295").collection("BarchartData");
  todos
    .findOne({ name: "test" }, { projection: { data: 1} })
    .then(data => {
      res.json(data.data);
    })
    .catch(next);
});

router.post('/todos', (req, res, next) => {
  if(req.body.action){
    Todo.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/todos/:id', (req, res, next) => {
  Todo.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;