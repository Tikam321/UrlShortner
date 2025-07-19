const express = require("express");
const http = require("http");
const app = express(); //. it is basically handler fucntiuon httpmethod(req, res) => respoonse
const mongoose = require("mongoose");

app.use(express.json()); 
app.get("/", (req, res) => {
  return res.send("hello from express.");
});

// connection mongodb
async function connectMongoDB(url) {
  return mongoose
  .connect(url)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Mongo Error"));
}
module.exports = {connectMongoDB};