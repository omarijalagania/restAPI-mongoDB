const express = require("express");
const router = express.Router();
const Tinder = require("../models/Tinder");

//get Tinder users
router.get("/users", (req, res) => {
  Tinder.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

//Post Tinder users

router.post("/add/users", (req, res) => {
  Tinder.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
