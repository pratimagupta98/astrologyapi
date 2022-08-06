const Blog = require("../models/blogs");
const resp = require("../helpers/apiResponse");

const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
 
const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.addBlog = async (req, res) => {
  //console.log(req.body);
  const { blog_title, blogImg, desc } = req.body;

  const newBlog = new Blog({
    blog_title: blog_title,
    blogImg: blogImg,
    desc: desc,
  });

  
    const findexist = await Blog.findOne({
        blog_title: blog_title,
    });
    if (findexist) {
        resp.alreadyr(res);
    } else {
        if (req.files) {
            if (req.files.blogImg[0].path) {
              alluploads = [];
              for (let i = 0; i < req.files.blogImg.length; i++) {
                const resp = await cloudinary.uploader.upload(
                  req.files.blogImg[i].path,
                  { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.blogImg[i].path);
                alluploads.push(resp.secure_url);
              }
              newBlog.blogImg = alluploads;
            }
          }
          newBlog.save()
      
      
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
        };
};

exports.getBlog = async (req, res) => {
await Blog.find() 
.sort({ sortorder: 1 })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

exports.viewoneBlog = async (req, res) => {
await Blog.findOne({ _id: req.params.id })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

exports.delBlog = async (req, res) => {
    await Blog.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

 


 
exports.editBlog = async(req,res)=>{
    const{blog_title,blogImg,desc} = req.body
    
    data ={}
    if(blog_title) {
        data.blog_title = blog_title
    }
    if(desc){
        data.desc = desc
    }
  
    if (req.files) {
        if (req.files.blogImg) {
          alluploads = [];
          for (let i = 0; i < req.files.blogImg.length; i++) {
            // console.log(i);
            const resp = await cloudinary.uploader.upload(req.files.blogImg[i].path, {
              use_filename: true,
              unique_filename: false,
            });
            fs.unlinkSync(req.files.blogImg[i].path);
            alluploads.push(resp.secure_url);
          }
          // newStore.storeImg = alluploads;
          data.blogImg = alluploads;
        }
     }
     await Blog.findOneAndUpdate(
        { _id: req.params.id},
        { $set: data },
        { new: true }
      )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };