const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/register", authController.RegisterController);
router.post("/login", authController.LoginController);
router.get("/logout",authController.LogoutController);
/**
 *@route logout
 description delete token from cookie and add token to blacklist
 */
module.exports = router;