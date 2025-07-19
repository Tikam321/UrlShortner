const express = require("express");
const router = express.Router();
const {handleGenerateNewShortURL, handleGetAnalytics, HandleUpdateTotalClicks} = require("../controller/url");

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", HandleUpdateTotalClicks);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;

