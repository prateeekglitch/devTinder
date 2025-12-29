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
profileRouter.patch("/profile/edit", authprotec, async () => {
  try {
    if (!validateEditAllowed) {
      return res.send("invalid edit req.");
    }
    const loggedUser = req.user;

    Object.keys(req.body).every((key) => loggedUser[key] == req.body[key]);
    await loggedUser.save();
    res.send(`${loggedUser.name} you are profile has been edited.`);
  } catch (error) {
    res.status(400).send("error" + err.message);
  }
});

module.exports = profileRouter;
