const User = require("../models/users");
const resp = require("../helpers/apiResponse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const key = "verysecretkey";

//console
exports.usersignup = async (req, res) => {
  const {fullname,email,mobile,password,cnfmPassword} = req.body

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);

  const newUser  = new User({
    fullname:fullname,
    email:email,
    mobile:mobile,
    password:hashpassword,
    cnfmPassword:hashpassword
  })
 
  const findexist = await User.findOne({ mobile: req.body.mobile})
  if (findexist) {
    resp.alreadyr(res);
  }else{
    newUser
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newUser,
        })
      )
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }

  }



  exports.userlogin = async(req,res)=>{
    const{email,mobile,password} =req.body

    const user = await User.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });
    console.log("Strrr",user)
    if(user){
      const validPass = await  bcrypt.compare(password,user.password)
      console.log("paaa",validPass)
      if(validPass){
        const token = jwt.sign(
          {
            userId: user._id,
        },
        key,
        {
          expiresIn: 86400000,
        }
        )
        res.header("auth-token", token).status(200).send({
          status: true,
          token: token,
          msg: "success",
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
     
 