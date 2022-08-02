const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");

const {
    signupsendotp,
  
   
} = require("../controller/users");

 

 
 
 
//router.post("/user/setting", tokenverify, setting);
router.post("/user/signupsendotp", signupsendotp);
 
module.exports = router;
