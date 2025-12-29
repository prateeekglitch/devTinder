const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pratprat313_db_user:fkNI1B4TCZl4mdFZ@devtinder.wnmrdq2.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
