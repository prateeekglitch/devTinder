const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required:true,
    validate(value){
    
    }
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
},
{
  timestamps:true,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
