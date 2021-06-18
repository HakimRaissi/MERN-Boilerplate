/* Requires */

// External Modules
const { createCanvas } = require("canvas");

// Models
const User = require("../models/users.model.js");

// Utils
const { NotFound, BadRequest } = require("../utils/errors.util");
const { uploadFromBuffer } = require("../utils/cloudinary.util");

/* Controllers */

// Log user
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if user exist
    const user = await User.findOne({ email });
    if (!user) throw new NotFound("user doesn't exist");

    // Check if passwords match
    const match = await user.comparePassword(password);
    if (!match) throw new BadRequest("wrong credentials");

    // Generate token
    const token = await user.generateToken();

    // Return response
    return res
      .status(200)
      .cookie("auth_token", token, { httpOnly: true })
      .json({
        status: "success",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          isAuth: true,
        },
      });
  } catch (err) {
    next(err);
  }
};

// Log out the user
const logout = (req, res, next) => {
  return res
    .clearCookie("auth_token")
    .status(200)
    .json({ status: "success", message: "user logged out " });
};

// Sign user
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Check if email already used
    const emailExist = await User.findOne({ email });
    if (emailExist) throw new BadRequest("email already used");

    // Check if username already taken
    const usernameExist = await User.findOne({ username });
    if (usernameExist) throw new BadRequest("username already taken");

    // Check if user uploaded an image
    let imageData;
    if (req.file && req.file.mimetype.split("/")[0] === "image") {
      imageData = await uploadFromBuffer(req.file.buffer, "users");
    }
    // If user didnt uploaded an image we create one using his username
    else {
      const height = 400;
      const width = 400;
      const backgroundColors = [
        "#7107DE",
        "#FD0E2E",
        "#D20563",
        "#3238E4",
        "#184C2D",
        "#279287",
        "#504BB0",
      ];

      const canvas = createCanvas(width, height);
      const context = canvas.getContext("2d");

      context.fillStyle =
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
      context.fillRect(0, 0, width, height);

      context.font = "bold 100pt Menlo";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#fff";
      context.fillText(username[0].toUpperCase(), width / 2, height / 2);

      const buffer = canvas.toBuffer("image/png");

      imageData = await uploadFromBuffer(buffer, "users");
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      image: imageData.url,
    });

    // Generate token
    const token = await user.generateToken();

    // Return response
    return res
      .status(201)
      .cookie("auth_token", token, { httpOnly: true })
      .json({
        status: "success",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          isAuth: true,
        },
      });
  } catch (err) {
    next(err);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({ status: "success", users });
  } catch (err) {
    next(err);
  }
};

// Get user
const getUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id }).select("-password");

    if (!user) throw new NotFound("user doesn't exist");

    return res.status(200).json({ status: "success", user });
  } catch (err) {
    next(err);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findOneAndDelete({ _id });

    return res
      .status(200)
      .json({ status: "success", message: `user ${user._id} deleted` });
  } catch (err) {
    next(err);
  }
};

// Authenticate user
const authUser = async (req, res, next) => {
  try {
    const token = await req.user.generateToken();
    return res
      .status(200)
      .cookie("auth_token", token, { httpOnly: true })
      .json({
        status: "success",
        user: {
          _id: req.user._id,
          username: req.user.username,
          email: req.user.email,
          image: req.user.image,
          createdAt: req.user.createdAt,
          updatedAt: req.user.updatedAt,
          isAuth: true,
        },
      });
  } catch (err) {
    next(err);
  }
};

/* Exports */

module.exports = {
  login,
  logout,
  signup,
  getAllUsers,
  getUser,
  deleteUser,
  authUser,
};
