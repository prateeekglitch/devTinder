const express = require("express");
const userRouter = express.Router();

const { authprotec } = require("../middlewares/auth");
const {ConnectionRequestModel} = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA="name gender age";

userRouter.get("/user/requests/received", authprotec, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status:"interested"
    }).populate (
        "fromUserId",
        USER_SAFE_DATA,
    )

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", authprotec, async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
          $or: [
            { toUserId: loggedInUser._id, status: "accepted" },
            { fromUserId: loggedInUser._id, status: "accepted" },
          ],
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({data});
    } catch (error) {
        res.status(400).send(error.message)
    }
})

userRouter.get("/feed", authprotec, async(req,res)=>{
    try {
        const loggedUser = req.user;

        const page = parseInt(req.query.page)||1;
        let limit = parseInt(req.query.limit)||10;
        limit = limit>50?5:limit;
        const skip = (page-1)*limit;

        const connectionRequests = await ConnectionRequestModel.find({
                $or :[
                    {fromUserId:loggedUser._id},
                    {toUserId:loggedUser._id}
                ]
        }).select("fromUserId toUserId")

        const hiddenUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hiddenUsersFromFeed.add(req.fromUserId.toString());
            hiddenUsersFromFeed.add(req.toUserId.toString());
            
        });

        const users = await User.find({
           $and :[
            { _id:{$nin:Array.from(hiddenUsersFromFeed)}},
            {_id:{$ne: loggedUser._id}},
           ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.send(users);
    } catch (error) {
        res.status(400).json(error.message) 
    }
})

module.exports= userRouter;