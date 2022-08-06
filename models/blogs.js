const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    blog_title: {
      type: String,
    },
    blogImg: {
      type: Array,
    },
   
    desc: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", thisSchema);
