const express = require("express");
const http = require("http");
const app = express(); //. it is basically handler fucntiuon httpmethod(req, res) => respoonse
const mongoose = require("mongoose");
const urlRouter = require("./routes/url");
const {connectMongoDB} = require("./mongoConnection");
const URL = require("./models/url");
const {start} = require("./kafkaConfig/consumer");
start();
connectMongoDB("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());
app.use("/url", urlRouter);
// app.get("/:shortId", async (req,res) => {
//   const shortId = req.params.shortId;
//   console.log("redirect url function executed");
  
  
//   const entry = await URL.findOneAndUpdate({
//     shortId: shortId
//   },{
//     $push: {
//       visitHistory:{
//          timeStamp: Date.now()
//       },
//     }
//   });

//  console.log(entry.redirectURL);
 
//   return res.redirect(entry.redirectURL);
// });

// app.get("/:shortId", async (req,res) => {
//   const shortId = req.params.shortId;
//   console.log("redirect url function executed");
//   const entry = await URL.findOneAndUpdate({
//     shortId: shortId
//   },{
//     $push: {
//       visitHistory:{
//          timeStamp: Date.now()
//       },
//     }
//   });

//  console.log(entry.redirectURL);
//   return res.redirect(entry.redirectURL);
// });

// app.get("/analytics/:shortId", async (req, res) => {
//     const shortId = req.params.shortId;
//     const result = await URL.findOne({shortId});
//     return res.json({total_clicks: result.visitHistory.length, analytics: result.visitHistory});
// });

app.listen(8001, () => console.log("server has started"));

// const myServer = http.createServer(app);

// myServer.listen(8001,() => console.log("server has started"));
