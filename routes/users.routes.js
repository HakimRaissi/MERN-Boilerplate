/* Requires */

// External Modules
const router = require("express").Router();

// Middlewares
const auth = require("../middlewares/auth.middleware");
const { uploadUserImage } = require("../middlewares/multer.middleware");

// Controllers
const {
  login,
  signup,
  getAllUsers,
  getUser,
  deleteUser,
  logout,
  authUser,
} = require("../controllers/users.controllers");

/* Routes */

// @route POST /api/users/signup
// @desc sign up the user
// @access public
router.post("/signup", uploadUserImage, signup);

// @route POST /api/users/login
// @desc login the user
// @access public
router.post("/login", login);

// @route GET /api/users/logout
// @desc log out the user
// @access public
router.get("/logout", logout);

// @route GET /api/users/
// @desc authenticate the user and refresh the token
// @access private
router.get("/auth", auth, authUser);

// @route GET /api/users/all
// @desc get all the users
// @access public
router.get("/all", getAllUsers);

// @route GET /api/users/
// @desc get user
// @access public
router.get("/:_id", getUser);

// @route DELETE /api/users/
// @desc delete user
// @access private
router.delete("/", auth, deleteUser);

/* Exports */

module.exports = router;
