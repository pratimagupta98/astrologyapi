const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
   adminimg: {
      type: Array,
     
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    password: {
      type: String,
    },
    cnfmPassword: {
      type: String,
    },
   
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", thisSchema);
