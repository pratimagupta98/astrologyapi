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
    mobile: {
      type: Number
    },
    password: {
      type: String,
    },
    cnfmPassword: {
      type: String,
    },
    userimg: {
      type: Array,
    },
    dob:{type: String},
         otp: { type: String },

  },



  { timestamps: true }
);


module.exports = mongoose.model("user", thisSchema);
