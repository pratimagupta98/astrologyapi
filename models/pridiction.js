const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pridictionSchema = new Schema(
    {
     
      title:{
type :String
      },
      rashi:{
        type: String,
      },
      type:{
        type: String, 
        // monthly,weekly,monthly
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("pridiction", pridictionSchema);
