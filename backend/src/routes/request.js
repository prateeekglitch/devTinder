const express = require("express");
const requestRouter = express.Router();
const { authprotec } = require("../middlewares/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  authprotec,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.send("invalid status type:" + status);
    }


      const toUser = await User.findById( toUserId );
     if (!toUser) {
       return res.status(404).json({ message: "user not found" });
     }
     
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "connection request already exists!" });
      }
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message: "Connection Request Sent Successfully",
        data,
      });
    } catch (error) {
      console.log(error); // 👈 ADD THIS

      res.status(400).json({
        message: error.message,
      });

    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  authprotec,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed!" });
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({
        message: "Connection request " + status,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

/* ===============================
   GET RECEIVED REQUESTS
================================= */

requestRouter.get(
  "/user/requests/received",
  authprotec,
  async (req, res) => {
    try {
      const loggedUser = req.user;

      const requests = await ConnectionRequestModel.find({
        toUserId: loggedUser._id,
        status: "interested",
      }).populate("fromUserId", "name age photoUrl about gender");

      res.json(requests);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
);


module.exports = requestRouter;
