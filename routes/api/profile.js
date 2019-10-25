const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const ProfileModel = require("../../models/Profile");

const User = require("../../models/Users");
//@route    api/profile/test
//@desc     Test API
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile is Working Good" }));

//@route    api/profile/
//@desc     Test API
//@access   Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    ProfileModel.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No Profile Info Available for this user";
          return req.status(404).json(errors);
        }
        req.json({ success: "true", user: profile });
      })
      .catch(err => res.status(404).json({ err: "Internal Server Error" }));
  }
);
module.exports = router;
