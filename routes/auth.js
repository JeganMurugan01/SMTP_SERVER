const express = require("express");
const { userlogin } = require("../controller/Authcontroller");

const authroute = express.Router();

authroute.post("/signup", userlogin.userdata);
authroute.post("/login", userlogin.Login);
authroute.post("/reftoken", userlogin.refreshtoken)

module.exports = authroute;
