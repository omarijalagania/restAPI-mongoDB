const express = require("express");
const router = express.Router();
const Uber = require("../models/UberCart");

//get Tinder users
router.get("/uber/cart/items", (req, res) => {
  Uber.find()
    .then((cart) => res.json(cart))
    .catch((err) => console.log(err));
});

//Post Tinder users

router.post("/uber/cart", (req, res) => {
  const uberCart = new Uber({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  uberCart.save();
  res.status(200).send(uberCart);
});

module.exports = router;
