const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pridictionSchema = new Schema(
  {

    title: {
      type: String
    },
    rashiName: {
      type: String,
    },
    pre_type: {
      type: String,
      // monthly,weekly,monthly
    },
    desc: {
      type: String,
    },
    status: {
      type: String,
      default:"Active"
    },
date:{
  type: String,
},
  },

  { timestamps: true }
);


module.exports = mongoose.model("pridiction", pridictionSchema);
