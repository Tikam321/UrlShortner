const { createClient } = require("redis");

const client = createClient();

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

client.connect(); // returns a Promise

module.exports = client;