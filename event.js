const EventEmitter = require("events");
const celebrity = new EventEmitter();

// subscibe to celebrity for observer 1
celebrity.on("race", function (result) {
  if (result === "win") console.log("congratulations you're the best");
});

// subscibe to celebrity for observer 2
celebrity.on("race", function (result) {
  if (result === "lost") console.log("boo i could've done better than that");
});

process.on("exit", (code) => {
  console.log("process exit event with code: ", code);
});

celebrity.emit("race", "win");
celebrity.emit("race", "lost");
