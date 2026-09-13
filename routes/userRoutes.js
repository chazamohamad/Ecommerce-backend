const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getUsers);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

// signup API

router.post("/signup", signup);

// login API

router.post("/login", login);

module.exports = router;
