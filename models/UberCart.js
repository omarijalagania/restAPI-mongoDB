const mongoose = require("mongoose");

const UberSchema = new mongoose.Schema({
  items: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  restaurantName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Uber", UberSchema);
