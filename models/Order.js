const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Order number

    orderNumber: {
      type: String,

      required: true,

      unique: true,
    },

    // User who made the order

    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    // Products inside order

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

    // Total price of order

    totalPrice: {
      type: Number,

      required: true,
    },

    // Customer phone number

    phoneNumber: {
      type: String,

      required: true,
    },

    // Delivery address

    address: {
      type: String,

      required: true,
    },

    // Order status

    status: {
      type: String,

      enum: ["pending", "ondelivery", "completed"],

      default: "pending",
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
