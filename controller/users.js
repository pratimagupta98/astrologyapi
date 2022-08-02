const User = require("../models/users");


// exports.signupsendotp = async (req, res) => {
//     //       let length = 6;
//     //     //   let otp = (
//     //     //     "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
//     //     //   ).slice(-length);
//     //     let otp = "123456";
      
//     //     const newUser = new User({
//     //       mobile: mobile,
//     //     });
//     //     const findexist = await User.findOne({ mobile :mobile });
//     //     if (findexist) {
//     //       res.json({
//     //         status: "success",
//     //         msg: "Welcome Back Otp send successfully",
//     //         registered: findexist?.mobile,
//     //         _id: findexist?._id,
//     //         otp: otp,
//     //       });
//     //     } else {
//     //         newUser.otp = otp;
//     //         newUser
//     //         .save()
//     //         .then((data) =>
//     //           res.json({
//     //             status: "success",
//     //             msg: "Otp send successfully",
//     //             registered: data?.mobile,
//     //             _id: data?._id,
//     //             otp: otp,
//     //           })
//     //         )
//     //         .catch((error) => {
//     //             res.status(400).json({
//     //               status: false,
//     //               msg: "error",
//     //               error: error,
//     //             });
//     //           });
//     //     }
//     //   };
    
// }
//////////////
    
    exports.signupsendotp = async (req, res) => {
            let length = 6;
          //   let otp = (
          //     "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
          //   ).slice(-length);
          let otp = "123456";
        
          const newUser = new User({
            mobile: req.body.mobile,
          });
          const findexist = await User.findOne({ mobile :req.body.mobile });
          if (findexist) {
            res.json({
              status: "success",
              msg: "Welcome Back Otp send successfully",
              registered: findexist?.mobile,
              _id: findexist?._id,
              otp: otp,
            });
          } else {
              newUser.otp = otp;
              newUser
              .save()
              .then((data) =>
                res.json({
                  status: "success",
                  msg: "Otp send successfully",
                  registered: data?.mobile,
                  _id: data?._id,
                  otp: otp,
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
        };
      
  
        