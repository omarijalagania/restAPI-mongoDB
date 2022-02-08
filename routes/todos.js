const express = require("express");
const router = express.Router();

const Todos = require("../models/Todos");

//get All Todos from Database
router.get("/todos", (req, res) => {
  Todos.find()
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err));
});

//Put Todos to Database
router.post("/add/todos", async (req, res) => {
  const todos = await new Todos({
    title: req.body.title,
    isComplete: req.body.isComplete,
  });
  todos.save();
  res.status(200).send(todos);
});

//Delete Todos from Database
router.delete("/delete/todos/:id", async (req, res) => {
  const todo = await Todos.findByIdAndDelete(req.params.id);
  res.status(200).json(todo);
});

//Complete Todos from Database

router.get("/complete/todo/:id", async (req, res) => {
  const todo = await Todos.findById({ _id: req.params.id });
  todo.isComolete = !todo.isComolete;
  todo.save();
  res.status(200).json(todo);
});

module.exports = router;
