const express = require("express");
const router = express.Router();
const Uber = require("../models/UberCart");

//get uber cart items
router.get("/uber/cart/items", (req, res) => {
  Uber.find()
    .then((cart) => res.json(cart))
    .catch((err) => console.log(err));
});

//Post uber cart

router.post("/uber/cart", async (req, res) => {
  const uberCart = await new Uber(req.body);
  uberCart.save();
  res.status(200).send(uberCart);
});

//Post uber cart

router.delete("/uber/cart/delete/items", async (req, res) => {
  const uberCart = await Uber.deleteMany();

  res.status(200).send(uberCart);
});

module.exports = router;
