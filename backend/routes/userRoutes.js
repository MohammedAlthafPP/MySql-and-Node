const express = require("express");
const {
  registerUser,
  LoginUser,
  logout,
  LoggedUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
const { authorizesdRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/logout").get(logout);
router.route("/user/:id").get(LoggedUser);
router.route("/admin/users").get(getAllUsers, authorizesdRoles("admin"));
router.route("/admin/user/:id").delete(deleteUser, authorizesdRoles("admin"));

module.exports = router;
