const express = require("express");

const {
  validateForgotPassword,
  forgotPassword,
} = require("../controller/ForgotPassword");
const KeepLogin = require("../controller/KeepLogin");
const { validateLogin, login } = require("../controller/Login");
const verify = require("../controller/Verify");
const { validateRegis, regis } = require("../controller/Regis");
const resetPassword = require("../controller/ResetPassword");
const validateResetPass = resetPassword.validateResetPass();
const changePassword = require("../controller/ChangePassword");
const validateChangePass = changePassword.validateChangePass();

const router = express.Router();
router.use(express.json());

router.post("/", validateRegis(), regis);
router.patch("/verify", verify);
router.post("/login", validateLogin(), login);
router.get("/", KeepLogin);
router.put("/forgot-pass", validateForgotPassword(), forgotPassword);
router.patch("/reset-pass", validateResetPass, resetPassword.resetPassword);
router.patch("/change-pass", validateChangePass, changePassword.changePassword);

module.exports = router;
