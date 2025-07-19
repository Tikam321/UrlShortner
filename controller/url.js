const { short } = require("webidl-conversions");
const URL = require("../models/url");
const shortid = require("shortid");
const redisClient = require("../redisClient");
const kafka = require("../kafkaConfig/kafka");
const {producrClickEvents: producerClickEvents} = require("../kafkaConfig/producer");

async function handleGenerateNewShortURL(req, res) {
  
  const shortId = shortid.generate();
  const givenUrl = req.body.url;
  if (!givenUrl) {
    return res.status(400).json({"error": "url is requierd"});
  }
  await URL.create({
    shortId,
    redirectURL: givenUrl,
    visitHistory: []
  });

  // precomputing the shortid in the cache
   await redisClient.set(shortId, givenUrl, { EX: 86400 });

  return res.json({id : shortId});
}

async function HandleUpdateTotalClicks (req,res)  {
  const shortId = req.params.shortId;
  const cachedUrl = await redisClient.get(shortId);
  let redirectUrl;
  if (cachedUrl) {
    console.log("cached hit");
    redirectUrl = cachedUrl;
  } else {
     const entry = await URL.findOne({
    shortId: shortId
  });
 if (!entry || !entry.redirectURL) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  console.warn(redirectUrl);

  redirectUrl = entry.redirectURL;
    
  console.log("the shortId is fetch from the mongo db server");
  
  // save in Redis cache with TTL of 1 day(86400 seconds)
  await redisClient.set(shortId, redirectUrl, {EX: 86400});

  };

  // updateing the total clicks per hit forshort id
  console.log("the click is sending ....");
  
  producerClickEvents(shortId, Date.now());

    console.log("the click is sent for kafka streaming");

  //  await URL.updateOne(
  //   {shortId},
  //   {
  //   $push: {
  //     visitHistory:{
  //        timeStamp: Date.now()
  //     },
  //   }
  // }
  // );
 
  return res.redirect(redirectUrl);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    console.log("the handlegetanalysis function has called ");
    
    const result = await URL.findOne({shortId});
    return res.json({total_clicks: result.visitHistory.length, analytics: result.visitHistory});
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  HandleUpdateTotalClicks
}