/* Requires */

// External modules
const Joi = require("joi");

/* validation Schemas */

const signupSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  description: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
});

/* Exports */

module.exports = { signupSchema, loginSchema };
