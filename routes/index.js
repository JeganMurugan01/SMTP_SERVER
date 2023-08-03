const express = require("express");
const usermaildata = require("../controller/maildatacontroller");
const router = express.Router();

router.post("/mail", usermaildata.maildata);
router.get('/mail',usermaildata.getmaildata)
router.get('/getmail',usermaildata.getbyidcontroller)
router.delete('/deletemail',usermaildata.deletemail)
router.put('/updatestatus',usermaildata.putid)
module.exports = {router};
