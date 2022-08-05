const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
       name:{
        type: String, 
       },
       email:{
        type: String, 
       },
       subject:{
        type: String, 
       },
       msg:{
        type: String, 
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("contactus", thisSchema);
