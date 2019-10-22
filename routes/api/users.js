const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "User is Working Good" }));

module.exports = router;
