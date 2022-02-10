const mongoose = requare("mongoose");
const Schema = mongoose.Schema;

const UberUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        price: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    ],
  },
});

module.exports = mongoose.model("UberUser", UberUserSchema);
