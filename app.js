const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
//const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//require
 
const users = require("./routes/users")
const astrologer = require("./routes/astrologer")
const admin = require("./routes/admin")
const aboutus = require("./routes/aboutus")
const terms_condition = require("./routes/terms_condition")
const contact_us = require("./routes/contact_us")
const banner = require("./routes/banner")
const faq = require("./routes/faq")
const blogs = require("./routes/blogs")
const privacy_policy = require("./routes/privacy_policy")



 
//use
app.use("/", users);
app.use("/", astrologer);

app.use("/", admin);
app.use("/", aboutus);
app.use("/", terms_condition);
app.use("/", contact_us);
app.use("/", banner);
app.use("/", faq);
app.use("/", blogs);
app.use("/", privacy_policy);



app.get("/", (req, res) => {
  res.send("Hello World!");
});

//console.log(process.env.DB);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });
  

app.listen(process.env.PORT || 8000, () => {
  console.log("Example app listening on port 8000");
});

//    http://localhost:5000/admin
