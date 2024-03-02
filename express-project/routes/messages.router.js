const express = require("express");

const messagesRouter = express.Router();

const messagesController = require("../controller/messages.controller");

//? messages routes
messagesRouter.get("/", messagesController.getMessage);
messagesRouter.post("/", messagesController.postMessage);

module.exports = messagesRouter;
