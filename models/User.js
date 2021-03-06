const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },

  email: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cart: {
    items: [
      {
        title: String,
        description: String,
        price: String,
        image: String,
      },
    ],
  },
  orders: {
    items: [
      {
        title: String,
        description: String,
        price: String,
        image: String,
      },
    ],
  },
  favorites: {
    items: [
      {
        title: String,
        image: String,
        description: String,
        price: String,
        id: String,
      },
    ],
  },
});

module.exports = mongoose.model("Users", userSchema);
