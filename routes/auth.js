const express=require('express');
const { userlogin } = require('../controller/Authcontroller');

const authroute=express.Router();

authroute.post('/signup',userlogin.userdata)

module.exports={authroute}