const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const URL = process.env.MONGO_url;

mongoose.connection.once("open", () => {
  console.log("connection to db was successful!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
