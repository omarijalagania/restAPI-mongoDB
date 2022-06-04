const mongoose = require("mongoose")

const feedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  timestamps: {
    type: Date,
  },
})

module.exports = mongoose.model("Feed", feedSchema)
