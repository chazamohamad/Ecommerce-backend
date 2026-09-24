const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Unique order number

    orderNumber: {
      type: String,

      required: true,

      unique: true,
    },

    // User who created the order

    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    // Products inside the order

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

        // Product price at the moment of purchase

        price: {
          type: Number,

          required: true,
        },
      },
    ],

    // Total price of all products

    totalPrice: {
      type: Number,

      required: true,
    },

    // Delivery information

    deliveryInfo: {
      phoneNumber: {
        type: String,

        required: true,
      },

      country: {
        type: String,

        required: true,
      },

      city: {
        type: String,

        required: true,
      },

      area: {
        type: String,

        required: true,
      },

      address: {
        type: String,

        required: true,
      },

      notes: {
        type: String,

        default: "",
      },
    },

    // Payment method

    paymentMethod: {
      type: String,

      enum: ["cash_on_delivery", "card"],

      default: "cash_on_delivery",
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
