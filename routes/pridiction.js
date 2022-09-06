const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    addPridiction,
    getPridiction,
    getonePridiction,
    editPridiction,
    dltPridiction
} = require("../controller/pridiction");

 
  
 
 
 router.post("/admin/addPridiction", addPridiction);
router.get("/admin/getPridiction", getPridiction);
router.get("/admin/getonePridiction/:id", getonePridiction);
router.post("/admin/editPridiction/:id", editPridiction);

router.get("/admin/dltPridiction/:id", dltPridiction);

module.exports = router;
 