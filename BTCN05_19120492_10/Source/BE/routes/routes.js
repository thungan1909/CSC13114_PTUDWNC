const express = require("express");
const router = express.Router();

const registerController = require("../src/Register/register.Controller");
const loginController = require("../src/Login/login.Controller");

router.post("/register", registerController.register);
router.post("/login", loginController.login);               // 5.2

router.get("/", registerController.helo);

module.exports = router;