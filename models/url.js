const mongoos = require("mongoose");

const urlSchema = new mongoos.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{
    timeStamp: {
      type: Number,
    }
  }]
}, {
  timestamp: true
});

const URL = mongoos.model("url", urlSchema);
module.exports = URL;

