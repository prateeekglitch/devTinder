const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { ExplainVerbosity } = require("mongodb");



authRouter.post("/signup", async (req,res) => 
  {  
  try {
    const {name, email, password,age,gender} = req.body;

    const hashedone = await bcrypt.hash(password, 10);


    const user = new User({
      name: name,
      email: email,
      password: hashedone,
      age:age,
      gender:gender,

    });
   await user.save();
   res.send("user added done.");
  } catch (error) {
   res.status(400).send("failed to save user.")
  }
});

authRouter.post("/login", async (req,res)=>{
  try {
  const {email, password} = req.body;
  const user = await User.findOne({email:email});
  if(!user){
   return res.send("user doesnt exist");
  }

  const checkpassword = await bcrypt.compare(password,user.password);
  if(!checkpassword){
    return res.status(400).send("wrong credentials");
  }
  const token = jwt.sign({userId:user._id},"hehehe");

  res.cookie("token",token);
  res.send("success")

}
   catch (error) {
    res.send("an error occured."+ error.message)
    
  }
})

authRouter.post("/logout",(req,res)=>{
    res.cookie("token", null,{expires : new Date(Date.now())})
    res.send("logout done.")
})

module.exports = authRouter;