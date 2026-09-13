const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  // Cart belongs to User

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Products inside cart

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],

  // Total price of cart

  totalPrice: {
    type: Number,

    default: 0,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
