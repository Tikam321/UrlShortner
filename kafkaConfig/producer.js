const kafka = require("./kafka");
const producer = kafka.producer();

  console.log("producr is connecting");

async function producrClickEvents(shortId, timestamp) {
  await producer.connect();
  console.log("producer is connected");
  await producer.send({
  topic: "url-visits",
  messages: [
    {
      value: JSON.stringify({
        shortId,
        timestamp,
      }),
    },
  ],
});
console.log("the data is sent to priducer");

}

module.exports = {
  producrClickEvents,
}