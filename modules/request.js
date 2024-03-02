const TIMEOUT_SEC = 500;

function encrypt(data) {
  return "encrypted data";
}

function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`sending ${encryptedData} to ${url}`);
}

module.exports = { TIMEOUT_SEC, send };

console.log("hello from request");
