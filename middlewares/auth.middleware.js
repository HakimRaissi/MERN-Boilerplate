/* Requires */

// External Modules
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/users.model");

// Utils
const { BadRequest } = require("../utils/errors.util");

/* Auth Middleware */

const auth = async (req, res, next) => {
  try {
    const token = req.cookies["auth_token"];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id);
      next();
    } else {
      res.user = null;
      throw new BadRequest("invalid token");
    }
  } catch (err) {
    next(err);
  }
};

/* Exports */
module.exports = auth;
