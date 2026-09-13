const User = require("../models/User");
const bcrypt = require("bcrypt");

// GET ALL USERS

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-Password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE USER

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);

    const user = new User({
      FullName: req.body.FullName,

      Email: req.body.Email,

      Password: hashedPassword,

      Role: req.body.Role,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE USER

const updateUser = async (req, res) => {
  try {
    const updateData = {
      FullName: req.body.FullName,

      Email: req.body.Email,

      Role: req.body.Role,
    };

    if (req.body.Password) {
      updateData.Password = await bcrypt.hash(req.body.Password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,

      updateData,

      {
        new: true,
      },
    ).select("-Password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SIGNUP

const signup = async (req, res) => {
  try {
    const { FullName, Email, Password } = req.body;

    // check if email already exists

    const existingUser = await User.findOne({
      Email: Email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // encrypt password

    const hashedPassword = await bcrypt.hash(Password, 10);

    // create user

    const user = new User({
      FullName: FullName,

      Email: Email,

      Password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // find user by email

    const user = await User.findOne({
      Email: Email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // compare password

    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    // success login

    res.json({
      success: true,

      user: {
        id: user._id,
        FullName: user.FullName,
        Email: user.Email,
        Role: user.Role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  signup,
  login,
};
