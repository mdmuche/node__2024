const express = require("express");
const path = require("path");

const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const PORT = 4000;

//? middleware
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(
    `the method used was ${req.method}, with the url: ${req.baseUrl}${req.url}, ${delta}ms`
  );
});

app.use("/site", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/", (req, res) => {
  res.render("index", {
    title: "my friends are very clever",
    caption: "let's go skiing",
  });
});
app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`listening for request at port ${PORT}`);
});
