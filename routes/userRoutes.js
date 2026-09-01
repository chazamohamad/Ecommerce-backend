const express = require("express");

const router = express.Router();

const { signup, login } = require("../controllers/userController");

// signup API

router.post("/signup", signup);

// login API

router.post("/login", login);

module.exports = router;
