const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/User");

const { validateRegister, validateLogin } = require("../validation");

router.post("/register", (req, res) => {
  //use joi to validate registration
  const { error } = validateRegister(req.body);
  //if error, return 400 with error message
  if (error) return res.status(400).send(error.details[0].message);

  //check if user already exists

  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (user) return res.status(400).send("User already exists");
      //if user does not exist, create new
    })
    .catch((err) => {
      console.log(err);
    });

  //Hashing a password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  //Creating a new user
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log({ message: err });
    });
});

router.post("/login", (req, res) => {
  const { error } = validateLogin(req.body);

  //if error, return 400 with error message
  if (error) return res.status(400).send(error.details[0].message);
  res.send("Login");
});

module.exports = router;
