const http = require("http");

const PORT = 3000;

const server = http.createServer();

const friends = [
  {
    id: 0,
    name: "nicolas tesla",
  },
  {
    id: 1,
    name: "sir isaac newtoon",
  },
  {
    id: 2,
    name: "billy graham",
  },
];

server.on("request", (req, res) => {
  const items = req.url.split("/");
  // /friends/2 => ['', 'friends', '2']
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("request:", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    // res.writeHead(200, {
    //   "Content-Type": "application/json",
    // });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    if (items.length === 3) {
      const friendsIndex = +items[2];
      res.end(JSON.stringify(friends[friendsIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "POST" && items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>hello muche!</li>");
    res.write("<li>welcome to learning about astronomy</li>");
    res.write("<ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
