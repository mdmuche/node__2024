const express = require("express");
// const cluster = require("cluster");
// const os = require("os");

const app = express();

function delay(duartion) {
  const startTime = Date.now();
  while (Date.now() - startTime < duartion) {
    //event loop is blocked
  }
}

app.get("/", (req, res) => {
  // JSON.stringify({}) => "{}"
  // JSON.parse("{}") => {}
  // [5,1,2,4, 5].sort()
  //! the above are real life blocking function
  res.send(`performance example: ${process.pid}`);
});

app.get("/timer", (req, res) => {
  // delay the response
  delay(4000);
  res.send(`beep beep beep! ${process.pid}`);
});

//! while using cluster module, we don't need this anymore since we are now using pm2 which uses cluster internally
// console.log("running server.js");
// if (cluster.isMaster) {
//   console.log("master has been started..");
//   const NUM_WORKERS = os.cpus().length;
//   for (let i = 0; i < NUM_WORKERS; i++) {
//     cluster.fork();
//   }
// } else {
//   console.log("worker process started");
//   app.listen(3000);
// }

//? using pm2
console.log("running server.js");
console.log("worker process started");
app.listen(3000);
