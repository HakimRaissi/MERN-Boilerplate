// Load .env file if in development
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

module.exports = {
  mongo_uri: process.env.MONGO_URI,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  cld_cloud_name: process.env.CLD_CLOUD_NAME,
  cld_api_key: process.env.CLD_API_KEY,
  cld_api_secret: process.env.CLD_API_SECRET,
};
