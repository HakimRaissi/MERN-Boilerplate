const multer = require("multer");

const storage = multer.memoryStorage();

const uploadUserImage = multer({ storage }).single("image");

module.exports = { uploadUserImage };
