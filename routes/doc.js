const express = require("express")
const router = express.Router()

const Documents = require("../models/Documents")

//get All Docs from Database
router.get("/docs", (req, res) => {
  Documents.find()
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err))
})

//Put Docs to Database
router.post("/add/docs", async (req, res) => {
  const todos = await new Documents({
    name: req.body.name,
    flight_number: req.body.flight_number,
    description: req.body.description,
  })
  todos.save()
  res.status(200).send(todos)
})

module.exports = router
