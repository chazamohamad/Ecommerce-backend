const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
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

  review: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
