const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },

  Password: {
    type: String,
    required: true,
  },

  Role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
});

module.exports = mongoose.model("User", userSchema);
