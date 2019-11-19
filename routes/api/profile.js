const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

//load Profile Model
const Profile = require("../../models/Profile");
//load User Profile
const User = require("../../models/Users");
//@route    api/profile/test
//@desc     Test API
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile is Working Good" }));

//@route    api/profile/
//@desc     get Request
//@access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        console.log(profile);
        if (!profile) {
          errors.noprofile = "No Profile Info Available for this user";
          return res.status(404).json(errors);
        }
        res.json({ success: "true", user: profile });
      })
      .catch(err => res.status(404).json({ err: "Internal Server Error." }));
  }
);
//@route    api/profile/
//@desc     Post Request
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //skills array split
    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");

    //social
    profileFields.social = {};
    if (req.body.youtube) profileFields.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.facebook = req.body.facebook;
    if (req.body.linkdin) profileFields.linkdin = req.body.linkdin;
    if (req.body.instagram) profileFields.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //check handle
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "this Handle Already Exists";
            res.json.status(400).json(errors);
          }

          //save Profile if not Exists
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
module.exports = router;
