const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
      userimg: {
        type: Array,
      },
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
      
      status: {
        type: String,
        default: "Unenroll",
  
        //Enroll,Unenroll
      },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("user", thisSchema);
