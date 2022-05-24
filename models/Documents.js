const mongoose = require("mongoose")

const Documents = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  flight_number: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Documents", Documents)
