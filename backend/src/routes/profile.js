const express = require("express");
const profileRouter = express.Router();
const { authprotec } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditAllowed } = require("../utils/validation");

profileRouter.get("/profile/view", authprotec, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).send("could not fetch user.");
  }
});

profileRouter.patch("/profile/edit", authprotec, async (req,res) => {
  try {
    if (!validateEditAllowed(req.body)) {
      return res.send("invalid edit req.");
    }
    const loggedUser = req.user;

   Object.keys(req.body).forEach((key) => {
     loggedUser[key] = req.body[key];
   });

    await loggedUser.save();
    res.status(200).json({
      success: true,
      data: loggedUser,
    });

  } catch (error) {
    res.status(400).send("error" + error.message);
  }
});

module.exports = profileRouter;
