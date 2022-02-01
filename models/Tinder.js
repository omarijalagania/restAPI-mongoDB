const mongoose = require("mongoose");

const TinderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tinder", TinderSchema);
