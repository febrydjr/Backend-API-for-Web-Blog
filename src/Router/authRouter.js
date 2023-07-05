const express = require("express");

const {
  validateForgotPassword,
  forgotPassword,
} = require("../Controller/ForgotPassword");
const KeepLogin = require("../Controller/KeepLogin");
const { validateLogin, login } = require("../Controller/Login");
const verify = require("../Controller/Verify");
const { validateRegis, regis } = require("../Controller/Regis");

const router = express.Router();
router.use(express.json());

router.post("/", validateRegis(), regis);
router.patch("/verify", verify);
router.post("/login", validateLogin(), login);
router.get("/", KeepLogin);
router.put("/forgotPass", validateForgotPassword(), forgotPassword);

module.exports = router;
