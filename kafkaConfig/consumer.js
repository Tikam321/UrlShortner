const kafka = require("./kafka");
const URL = require("../models/url");

const consumer = kafka.consumer({
  groupId: "visit-groups"
});

console.log("consumer module started");


async function start() {
  await consumer.connect();
  await consumer.subscribe({topic: "url-visits", fromBeginning: true});

  console.log("consumer are consuming the visit logs");
  
  await consumer.run({
    eachMessage: async ({message}) => {
      // const {shortId, timestamp} = JSON.parse(message.value.toString());
      // const result = await URL.updateOne({shortId},
      //   {
      //     $push: {
      //       visitHistory: {
      //         timeStamp: timestamp,
      //       },
      //     },
      //   }
      // );
      //  if (result.modifiedCount > 0) {
      //       console.log(`✅ Visit logged for shortId: ${shortId}`);
      //     } else {
      //       console.warn(`⚠️ No document found for shortId: ${shortId}`);
      //     }
       try {
          const { shortId, timestamp } = JSON.parse(message.value.toString());

          const result = await URL.updateOne(
            { shortId },
            {
              $push: {
                visitHistory: {
                  timeStamp: timestamp,
                },
              },
            }
          );

          if (result.modifiedCount > 0) {
            console.log(`✅ Visit logged for shortId: ${shortId}`);
          } else {
            console.warn(`⚠️ No document found for shortId: ${shortId}`);
          }
        } catch (err) {
          console.error("❌ Error processing message:", err.message);
        }
    }
  });
};

module.exports = { start,}