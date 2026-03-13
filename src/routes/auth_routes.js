const express = require("express");
const router = express.Router();
const {Register, userLogin, forgotPassword, verifyOTP, resetPassword} = require("../controllers/auth_controllers.js");

router.post("/register", Register);
router.post("/login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

module.exports = router;