const Astrologer = require("../models/astrologer");
const resp = require("../helpers/apiResponse");
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
exports.signup = async (req, res) => {
  let length =6;
  let defaultotp = "123456";

  const newAstrologer= new Astrologer({
    fullname:req.body.fullname,
    mobile: req.body.mobile,
    email :  req.body.email,
    otp:defaultotp
  });
  
  const findexist = await Astrologer.findOne({ mobile: req.body.mobile})
  if (findexist) {
    resp.alreadyr(res);
  }else{
   // newUser.otp = defaultotp;
   newAstrologer
   .save()
   .then((data)=>{
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      data:data
      
    })
   })
   .catch((error) => resp.errorr(res, error));
}
  
  }
  
  exports.astrosignup= async(req,res)=>{
    const {fullname,email,mobile, password,cnfmPassword,img,gender, dob,primary_skills,all_skills,language, exp_in_years,conrubute_hrs,hear_abt_astrology,other_online_platform,why_onboard_you,suitable_tym_interview,crnt_city,income_src,highest_qualification,degree_deploma,clg_scl_name,lrn_abt_astrology,insta_link,fb_link,linkedln_link,youtube_link,website_link,anybody_prefer,min_earning_expe,max_earning_expe,long_bio} = req.body;
 


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);


const newAstrologer = new Astrologer({
  fullname:fullname,
  email:email,
  mobile:mobile,
  password:hashPassword,
  cnfmPassword:hashPassword,
  img:img,
  gender :gender,
  dob:dob,
  primary_skills:primary_skills,
  all_skills:all_skills,
  language:language,
  exp_in_years:exp_in_years,
  conrubute_hrs:conrubute_hrs,
  hear_abt_astrology:hear_abt_astrology,
  other_online_platform:other_online_platform,
  why_onboard_you:why_onboard_you,
  suitable_tym_interview:suitable_tym_interview,
  crnt_city:crnt_city,
  income_src:income_src,
  highest_qualification:highest_qualification,
  degree_deploma:degree_deploma,
  clg_scl_name:clg_scl_name,
  lrn_abt_astrology:lrn_abt_astrology,
  insta_link:insta_link,
  fb_link:fb_link,
  linkedln_link:linkedln_link,
  youtube_link:youtube_link,
  website_link:website_link,
  anybody_prefer:anybody_prefer,
  min_earning_expe:min_earning_expe,
  max_earning_expe:max_earning_expe,
  long_bio:long_bio
})

 const findexist = await Astrologer.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    if (req.files) {
      if (req.files.img[0].path) {
        alluploads = [];
        for (let i = 0; i < req.files.img.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.img[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.img[i].path);
          alluploads.push(resp.secure_url);
        }
        newAstrologer.img = alluploads;
      }
    }
    newAstrologer.save()


    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  }
  }

  exports.addAstroDetails = async(req,res)=>{
    const { gender, dob,primary_skills,all_skills,language, exp_in_years,conrubute_hrs,hear_abt_astrology,other_online_platform,why_onboard_you,suitable_tym_interview,crnt_city,income_src,highest_qualification,degree_deploma,clg_scl_name,lrn_abt_astrology,insta_link,fb_link,linkedln_link,youtube_link,website_link,anybody_prefer,min_earning_expe,max_earning_expe,long_bio} = req.body;
 

    data = {};

    if(gender) {
      data.gender =gender
    }
    if(dob) {
      data.dob =dob
    }
    if(primary_skills){
      data.primary_skills = dob
    }

  }
 exports.verifyotp = async(req,res)=>{
  const { mobile, otp } = req.body;
  const getuser = await Astrologer.findOne({mobile:mobile})
  if(getuser){
    if(otp == "123456"){
      const token = jwt.sign(
        {
          userId: getuser._id,
        },
        key,
        {
          expiresIn: "365d",
        }
      );
      res.header("auth-token", token).status(200).send({
        status: true,
        msg: "otp verified",
        otp :otp
         
      });
    } else {
      res.status(200).json({
        status: false,
        msg: "Incorrect Otp",
      });
    }
  };
  
    }
  