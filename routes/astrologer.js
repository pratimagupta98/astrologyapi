const express = require("express");
const router = express.Router();
 const multer = require("multer");
const fs = require("fs");

const {
  signup,
    astrosignup,
    verifyotp,
    astrologin,
    viewoneAstro,
    allAstro,
    editAstroDetails,
    dltAstro
     
   
} = require("../controller/astrologer");

 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file);
      let path = `./uploads`;
      if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads");
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg") ||
       file.mimetype.includes("pdf")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let uploads = multer({ storage: storage });
  
  let multipleUpload = uploads.fields([
    { name: "img", maxCount: 1 },
   
    //   { name: "storepan_img", maxCount: 5 },
    //   { name: "tradelicence_img", maxCount: 5 },
    //   { name: "companypan_img", maxCount: 5 },
    //   { name: "address_proof_img", maxCount: 5 },
  ]);
 
  signup
  router.post("/user/signup",signup);
  router.post("/user/verifyotp",verifyotp);

  router.post("/user/astrosignup", multipleUpload,astrosignup);
  router.post("/user/astrologin",astrologin);
  router.get("/user/viewoneAstro/:id",viewoneAstro);
  router.post("/user/editAstroDetails/:id",multipleUpload,editAstroDetails);

 router.get("/admin/allAstro", allAstro);
 router.get("/admin/dltAstro/:id", dltAstro);

  
module.exports = router;
