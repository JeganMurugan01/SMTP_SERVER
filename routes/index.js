const express = require("express");
const usermaildata = require("../controller/maildatacontroller");
const router = express.Router();

router.post("/mail", usermaildata.maildata);
router.get('/mail',usermaildata.getmaildata)
module.exports = {router};
