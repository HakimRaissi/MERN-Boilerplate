const { GeneralError } = require("../utils/errors.util");

const errorHandler = (err, req, res, next) => {
  if (this instanceof GeneralError) {
    return res
      .status(err.getCOde())
      .json({ status: "error", message: err.message });
  }

  return res.status(500).json({ status: "error", message: err.message });
};

module.exports = errorHandler;
