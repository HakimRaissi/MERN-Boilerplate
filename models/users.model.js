/* Requires */

// External Modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Utils
const { jwt_secret } = require("../utils/environment.util");

/* Schema */

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    description: {
      type: String,
      maxLength: 1024,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving into db
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate token with user id as data
userSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id.toHexString() }, jwt_secret, {
    expiresIn: "1d",
  });
};

/* Model */

const User = mongoose.model("User", userSchema);

/* Exports */

module.exports = User;
