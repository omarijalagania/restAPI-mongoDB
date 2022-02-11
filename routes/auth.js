const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/User");
const jwt = require("jsonwebtoken");
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
    cart: {
      items: [{}],
    },
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

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);

  //if error, return 400 with error message
  if (error) return res.status(400).send(error.details[0].message);

  //check if user already exists
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email not found");

  //check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("invalid password");

  //create and assign a token

  const token = jwt.sign(
    { _id: user._id, name: user.name },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send({ token: token, cart: req.body.cart });
});

//get users cart
router.get("/cart/:id", async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });
  res.send(user.cart);
});

//post product to users cart

router.post("/cart/set/:id", async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });

  user.cart.items.push(...req.body);
  user.save();
  res.send(user.cart);
});

router.post("/cart/clear/:id", async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });

  user.cart.items.splice(0, user.cart.items.length);
  user.save();
  res.send(user.cart);
});

module.exports = router;
