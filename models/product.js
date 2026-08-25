const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
