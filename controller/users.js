const User = require("../models/users");
const resp = require("../helpers/apiResponse");
//const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
 
  
  exports.usersignup = async (req, res) => {
    const { fullname, userimg, email, mobile, password, cnfmPassword ,dob} =
      req.body;
  
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
  
    
    const newUser = new User({
      fullname: fullname,
      password: hashPassword,
      cnfmPassword: hashPassword,
      email: email,
      mobile: mobile,
      userimg: userimg,
      dob :dob
    });
  
    const findexist = await User.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });
    if (findexist) {
      resp.alreadyr(res);
    } else {
      if (req.files) {
        if (req.files.userimg[0].path) {
          alluploads = [];
          for (let i = 0; i < req.files.userimg.length; i++) {
            const resp = await cloudinary.uploader.upload(
              req.files.userimg[i].path,
              { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.userimg[i].path);
            alluploads.push(resp.secure_url);
          }
          newUser.userimg = alluploads;
        }
      }
      newUser.save()
  
  
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };
  }


  exports.userlogin = async(req,res)=>{
    const{email,mobile,password} =req.body

    const user = await User.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });
    console.log("Strrr",user)
    if(user){
      const validPass = await  bcrypt.compare(password,user.password)
      console.log("paaa",validPass)
      if(validPass){
        const token = jwt.sign(
          {
            userId: user._id,
        },
        key,
        {
          expiresIn: 86400000,
        }
        )
        res.header("auth-token", token).status(200).send({
          status: true,
          token: token,
          msg: "success",
          user: user,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "Incorrect Password",
          error: "error",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "User Doesnot Exist",
        error: "error",
      });
    }
  };

  exports.myprofile = async(req,res)=>{
    const{fullname,userimg,email,mobile,password,cnfmPassword} = req.body
    
    data ={}
    if(fullname) {
        data.fullname = fullname
    }
    
    if(email){
        data.email = email
    }
    if(mobile){
        data.mobile = mobile
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(password, salt);
      data.password = hashPassword;
    }
    if (cnfmPassword) {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(password, salt);
      data.cnfmPassword = hashPassword;
    }

    if (req.files) {
        if (req.files.userimg) {
          alluploads = [];
          for (let i = 0; i < req.files.userimg.length; i++) {
            // console.log(i);
            const resp = await cloudinary.uploader.upload(req.files.userimg[i].path, {
              use_filename: true,
              unique_filename: false,
            });
            fs.unlinkSync(req.files.userimg[i].path);
            alluploads.push(resp.secure_url);
          }
          // newStore.storeImg = alluploads;
          data.userimg = alluploads;
        }
     }
     await User.findOneAndUpdate(
        { _id: req.params.id},
        { $set: data },
        { new: true }
      )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };
    
     
    exports.viewoneuser = async (req, res) => {
      await User.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };


    exports.alluser= async (req, res) => {
      await User.find()
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };
  
    exports.dltuser = async (req, res) => {
      await User.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
    };