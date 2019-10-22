const express = require("express");
const router = express.Router();

//@route    api/profile/test
//@desc     Test API
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Posts is Working Good" }));

module.exports = router;
