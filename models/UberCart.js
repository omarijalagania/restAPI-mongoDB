const mongoose = require("mongoose");

const UberSchema = new mongoose.Schema({
  items: [
    {
      name: {
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
    },
  ],
  restaurantName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Uber", UberSchema);
