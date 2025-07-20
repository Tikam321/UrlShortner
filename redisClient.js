const { createClient } = require("redis");

// const client = createClient();

// docker container confirguration 
const client = createClient({
  url: 'redis://redis:6379'
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

client.connect(); // returns a Promise

module.exports = client;