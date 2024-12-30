var express = require("express");
var router = express.Router();
const { User } = require("../models/userModel");
const bcrypt = require('bcrypt')

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// CRUD

// router.post('/create-user', (req, res)=>{
//   User.create({email: req.body.email,password: req.body.password})
//   .then((newUser)=>{
//     console.log("User Credted")
//     res.send(newUser)
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
// })

// To Register User
router.post("/create-user", async (req, res) => {
  try {
    const {password} = req.body

    const chupahuapassowrd = await bcrypt.hash(password, 10)

    const nayaUser = await User.create({
      email: req.body.email,
      password: chupahuapassowrd,
    });
    res.send(nayaUser);
  } catch (error) {
    console.log(error);
  }
});

// To Read all user
router.get("/readAllUser", async (req, res) => {
  let allUsers = await User.find({ email: "dodo" });
  res.send(allUsers);
});

// To Read Single User
router.get("/sahil", async (req, res) => {
  let sahil = await User.findById("6772f98189eacbe5b2837e4d");
  res.send(sahil);
});

// To login
router.post("/login", async (req, res) => {
  const {password} = req.body;

  const loginUser = await User.findOne({email: req.body.email});

  if(!loginUser){
    return res.send("Users not exit")
  }

  const passwordMatch = await bcrypt.compare(password, loginUser.password)

  if(!passwordMatch){
    return res.send("Iwrong password")
  }

  res.send({message: "Login successfully",loginUser})

});

// To delete User
router.get("/delete", async (req, res) => {
  await User.findByIdAndDelete("6772f8f2969def4142920ea3")
  res.send("User Deleted Successfull!")
});

module.exports = router;
