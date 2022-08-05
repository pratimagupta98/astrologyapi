const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const {
    usersignup,
    userlogin
   
} = require("../controller/users");

 

 
 
 
 router.post("/user/usersignup", usersignup);
 router.post("/user/userlogin", userlogin);

 
module.exports = router;
