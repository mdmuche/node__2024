const path = require("path");

function getMessage(req, res) {
  res.render("messages", {
    title: "messages to my friends!",
    friend: "elon musk",
  });
  // res.sendFile(
  //   path.join(__dirname, "..", "public", "images", "skimountain.jpg")
  // );

  // res.send("<ul><li>hello abula welcome to to express</li></ul>");
}

function postMessage(req, res) {
  console.log("updating messages");
}

module.exports = {
  getMessage,
  postMessage,
};
