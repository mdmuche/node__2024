const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const URL = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("connection to db was successful!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(URL);
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`listening for request at port ${PORT}...`);
  });
}
startServer();
