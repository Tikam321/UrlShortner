const {Kafka} = require("kafkajs");

const kafka = new Kafka({
  clientId: "url-shortner",
  brokers: ["kafka:9092"],
});


// brokers: ["192.168.18.179:9092"],
module.exports = kafka;

