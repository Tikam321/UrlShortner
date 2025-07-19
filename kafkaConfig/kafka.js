const {Kafka} = require("kafkajs");

const kafka = new Kafka({
  clientId: "url-shortner",
  brokers: ["192.168.18.179:9092"],
});

module.exports = kafka;
