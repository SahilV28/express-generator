const mongoose = require("mongoose"); //requiring mongoose

// mongoose.connect("mongodb://127.0.0.1:27017/motikadatabase")
// .then(()=>{
//     console.log("Connected to db")
// })
// .catch((err)=>{
//     console.log(err)
// })

const connectTodatabase = async () => {
  try {
    const ans = await mongoose.connect(
      "mongodb://127.0.0.1:27017/motikadatabase"
    );
    console.log("Connected to db")
  } catch (error) {
    console.log(err);
  }
};

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: Number,
  password: String,
},{timestamps: true});

const User = mongoose.model("user", userSchema);
module.exports  = {User, connectTodatabase}