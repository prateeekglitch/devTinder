const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authprotec = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("login first");
    }

    const decoded = await jwt.verify(token, "hehehe");

    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(500).send("login first");
    }

    req.user = user;
    next();
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { authprotec };
