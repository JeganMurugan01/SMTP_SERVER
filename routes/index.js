const express = require("express");
const usermaildata = require("../controller/maildatacontroller");
const { authenticateToken } = require("../Pageconstants/authverify");
const { mailfiltercontroller } = require("../controller/Mailfiltercontroller");
const { deletebytrashid } = require("../controller/deletetrashbyid");
const router = express.Router();

router.post("/mail", usermaildata.maildata);
router.get("/mail", usermaildata.getmaildata);
router.get("/getmail", usermaildata.getbyidcontroller);
router.delete("/deletemail", usermaildata.deletemail);
router.put("/updatestatus", usermaildata.putid);
router.get("/search", mailfiltercontroller.filter);
router.get("/trash", usermaildata.gettrashmail);
router.delete("/deleteall", usermaildata.deletetrashmail);
router.delete("/trashid", deletebytrashid.trashbyid);
router.get("/trashid", usermaildata.gettashbyidcontroller);
module.exports = router;
