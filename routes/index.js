const express = require("express");
const usermaildata = require("../controller/maildatacontroller");
const { authenticateToken } = require("../Pageconstants/authverify");
const { mailfiltercontroller } = require("../controller/Mailfiltercontroller");
const router = express.Router();

router.post("/mail", authenticateToken, usermaildata.maildata);
router.get("/mail", authenticateToken, usermaildata.getmaildata);
router.get("/getmail", authenticateToken, usermaildata.getbyidcontroller);
router.delete("/deletemail", authenticateToken,usermaildata.deletemail);
router.put("/updatestatus",authenticateToken,usermaildata.putid);
router.get("/search",authenticateToken,mailfiltercontroller.filter)
module.exports = router;
