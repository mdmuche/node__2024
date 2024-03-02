const request = require("../request");
const response = require("../response");

module.exports = {
  TIMEOUT_SEC: request.TIMEOUT_SEC,
  send: request.send,
  read: response.read,
};

//? another way of exporting different module functions without using the import statement just by using the spread operator
// module.exports = {
//   ...require("./request"),
//   ...require("./response"),
// };

//! generally its not advisable to use index.js in your project
