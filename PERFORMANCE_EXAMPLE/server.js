const express = require("express");

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
  res.send("performance example");
});

app.get("/timer", (req, res) => {
  // delay the response
  delay(9000);
  res.send("Ding ding ding!");
});

app.listen(3000);
