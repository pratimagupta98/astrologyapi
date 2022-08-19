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
  let length = 6;
  let defaultotp = "123456";

  const newAstrologer = new Astrologer({
    fullname: req.body.fullname,
    mobile: req.body.mobile,
    email: req.body.email,
    otp: defaultotp
  });

  const findexist = await Astrologer.findOne({ mobile: req.body.mobile })
  if (findexist) {
    resp.alreadyr(res);
  } else {
    // newUser.otp = defaultotp;
    newAstrologer
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "otp send successfully",
          data: data

        })
      })
      .catch((error) => resp.errorr(res, error));
  }

}

exports.astrosignup = async (req, res) => {
  const { fullname, email, mobile, password, cnfmPassword, img, gender, dob, primary_skills, all_skills, language, exp_in_years, conrubute_hrs, hear_abt_astrology, other_online_platform, why_onboard_you, suitable_tym_interview, crnt_city, income_src, highest_qualification, degree_deploma, clg_scl_name, lrn_abt_astrology, insta_link, fb_link, linkedln_link, youtube_link, website_link, anybody_prefer, min_earning_expe, max_earning_expe, long_bio } = req.body;



  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);


  const newAstrologer = new Astrologer({
    fullname: fullname,
    email: email,
    mobile: mobile,
    password: hashPassword,
    cnfmPassword: hashPassword,
    img: img,
    gender: gender,
    dob: dob,
    primary_skills: primary_skills,
    all_skills: all_skills,
    language: language,
    exp_in_years: exp_in_years,
    conrubute_hrs: conrubute_hrs,
    hear_abt_astrology: hear_abt_astrology,
    other_online_platform: other_online_platform,
    why_onboard_you: why_onboard_you,
    suitable_tym_interview: suitable_tym_interview,
    crnt_city: crnt_city,
    income_src: income_src,
    highest_qualification: highest_qualification,
    degree_deploma: degree_deploma,
    clg_scl_name: clg_scl_name,
    lrn_abt_astrology: lrn_abt_astrology,
    insta_link: insta_link,
    fb_link: fb_link,
    linkedln_link: linkedln_link,
    youtube_link: youtube_link,
    website_link: website_link,
    anybody_prefer: anybody_prefer,
    min_earning_expe: min_earning_expe,
    max_earning_expe: max_earning_expe,
    long_bio: long_bio
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

exports.editAstroDetails = async (req, res) => {
  const { fullname, email, password, cnfmPassword, gender, dob, primary_skills, all_skills, language, exp_in_years, conrubute_hrs, hear_abt_astrology, other_online_platform, why_onboard_you, suitable_tym_interview, crnt_city, income_src, highest_qualification, degree_deploma, clg_scl_name, lrn_abt_astrology, insta_link, fb_link, linkedln_link, youtube_link, website_link, anybody_prefer, min_earning_expe, max_earning_expe, long_bio,status,callCharge } = req.body;


  data = {};

  if (fullname) {
    data.fullname = fullname
  }
  if (email) {
    data.email = email
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
  if (gender) {
    data.gender = gender
  }
  if (dob) {
    data.dob = dob
  }
  if (primary_skills) {
    data.primary_skills = primary_skills
  }
  if (all_skills) {
    data.all_skills = all_skills
  }
  if (language) {
    data.language = language
  }
  if (exp_in_years) {
    data.exp_in_years = exp_in_years
  }
  if (conrubute_hrs) {
    data.conrubute_hrs = conrubute_hrs
  }
  if (hear_abt_astrology) {
    data.hear_abt_astrology = hear_abt_astrology
  }
  if (other_online_platform) {
    data.other_online_platform = other_online_platform
  }
  if (why_onboard_you) {
    data.why_onboard_you = why_onboard_you
  }
  if (suitable_tym_interview) {
    data.suitable_tym_interview = suitable_tym_interview
  }
  if (crnt_city) {
    data.crnt_city = crnt_city
  }

  if (income_src) {
    data.income_src = income_src
  }
  if (highest_qualification) {
    data.highest_qualification = highest_qualification
  }
  if (degree_deploma) {
    data.degree_deploma = degree_deploma
  }
  if (clg_scl_name) {
    data.clg_scl_name = clg_scl_name
  }
  if (lrn_abt_astrology) {
    data.lrn_abt_astrology = lrn_abt_astrology
  }
  if (insta_link) {
    data.insta_link = insta_link
  }
  if (fb_link) {
    data.fb_link = fb_link
  }
  if (linkedln_link) {
    data.linkedln_link = linkedln_link
  }
  if (youtube_link) {
    data.youtube_link = youtube_link
  }
  if (website_link) {
    data.website_link = website_link
  }
  if (anybody_prefer) {
    data.anybody_prefer = anybody_prefer
  }
  if (min_earning_expe) {
    data.min_earning_expe = min_earning_expe
  }
  if (max_earning_expe) {
    data.max_earning_expe = max_earning_expe
  }
  if (long_bio) {
    data.long_bio = long_bio
  }
if(status){
  data.status = status
}
  if(callCharge){
    data.callCharge =callCharge
  }

  if (req.files) {
    if (req.files.img) {
      alluploads = [];
      for (let i = 0; i < req.files.img.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(req.files.img[i].path, {
          use_filename: true,
          unique_filename: false,
        });
        fs.unlinkSync(req.files.img[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.img = alluploads;
    }
  }
  await Astrologer.findOneAndUpdate(
    { _id: req.params.id },
    { $set: data },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.verifyotp = async (req, res) => {
  const { mobile, otp } = req.body;
  const getuser = await Astrologer.findOne({ mobile: mobile })
  if (getuser) {
    if (otp == "123456") {
      const token = jwt.sign(
        {
          astroId: getuser._id,
        },
        key,
        {
          expiresIn: "365d",
        }
      );
      res.header("auth-adtoken", token).status(200).send({
        status: true,
        msg: "otp verified",
        otp: otp,
        _id: getuser._id

      });
    } else {
      res.status(200).json({
        status: false,
        msg: "Incorrect Otp",
      });
    }
  };

}



exports.astrologin = async (req, res) => {
  const { email, mobile, password } = req.body

  const user = await Astrologer.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  console.log("Strrr", user)
  if (user) {
    const validPass = await bcrypt.compare(password, user.password)
    console.log("paaa", validPass)
    if (validPass) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        key,
        {
          expiresIn: 86400000,
        }
      )
      res.header("auth-adtoken", token).status(200).send({
        status: true,
        token: token,
        _id: user._id,
        msg: "successfully Login",
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

exports.viewoneAstro = async (req, res) => {
  await Astrologer.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.allAstro = async (req, res) => {
  await Astrologer.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.dltAstro = async (req, res) => {
  await Astrologer.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};