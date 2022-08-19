const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      fullname: {
        type: String,
      },
      email: {
        type: String,
      },
       mobile:{
        type:Number
       },
      password: {
        type: String,
      },
      cnfmPassword: {
        type: String,
      },
      img: {
        type: Array,
      },
      
      otp: { type: String },
      gender: {
        type: String,
      },
      dob: {
        type: String,
      },
      primary_skills: {
        type: String,
      },
      all_skills: {
        type: String,
      },
      language: {
        type: String,
      },
      exp_in_years: {
        type: String,
      },
      conrubute_hrs: {
        type: String,
      },
      hear_abt_astrology: {
        type: String,
      },
      other_online_platform: {
        type: String,
        //yes ,no
      },
      why_onboard_you: {
        type: String,
      },
      suitable_tym_interview: {
        type: String,
      },
      crnt_city: {
        type: String,
      },
      income_src: {
        type: String,
      },
      highest_qualification: {
        type: String,
      },
      degree_deploma: {
        type: String,
      },
      clg_scl_name: {
        type: String,
      },
      lrn_abt_astrology: {
        type: String,
      },
      insta_link: {
        type: String,
      },
      fb_link: {
        type: String,
      },
      linkedln_link: {
        type: String,
      },
      youtube_link: {
        type: String,
      },
      website_link: {
        type: String,
      },
      anybody_prefer: {
        type: String,
      },
      min_earning_expe: {
        type: String,
      },
      max_earning_expe: {
        type: String,
      },
  
      long_bio: {
        type: String,
      },
  status:{
    type:String
  },
  callCharge:{
    type:String
  },
   
      },
      
       
  
     
    { timestamps: true }
  );


  module.exports = mongoose.model("astrologer", thisSchema);
