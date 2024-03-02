const express = require("express");

const friendsController = require("../controller/friends.controller");

const friendsRouter = express.Router();

//? specific middleware for friends routes
friendsRouter.use((req, res, next) => {
  console.log("ip address:", req.ip);
  next();
});

//? friends  routes
friendsRouter.post("/", friendsController.postFriend);
friendsRouter.get("/", friendsController.getFriends);
friendsRouter.get("/:friendId", friendsController.getFriend);

module.exports = friendsRouter;
