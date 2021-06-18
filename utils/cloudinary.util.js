// Requires

// External Modules
const cloudinary = require("cloudinary").v2;

// Utils
const {
  cld_cloud_name,
  cld_api_key,
  cld_api_secret,
} = require("../utils/environment.util");

/* Config */

cloudinary.config({
  cloud_name: cld_cloud_name,
  api_key: cld_api_key,
  api_secret: cld_api_secret,
});

/* Methods */

// Upload image from a buffer
function uploadFromBuffer(buffer, folder = "default") {
  return new Promise((resolve, reject) => {
    if (buffer) {
      cloudinary.uploader
        .upload_stream({ folder }, (err, result) => {
          if (result) resolve(result);
          else reject(err);
        })
        .end(buffer);
    }
  });
}

/* Exports */

module.exports = { uploadFromBuffer };
