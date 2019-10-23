const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");

//load User model for Check Email
const User = require("../../models/Users");

//@route    api/profile/test
//@desc     Test API
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "User is Working Good" }));

//@route    api/profile/register
//@desc     User Registeration  API
//@access   Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email Already Exists!" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //Rating
        d: "ss" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    api/profile/login
//@desc     User Login  API
//@access   Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.json({
        email: "Enter Correct Email this email not contain any account!"
      });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create payload
        // res.json({ success: "true", msg: "Successfully Authenticate!" });
        //sign token
        var token = jwt.sign(
          payload,
          keys.secret,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: "true",
              msg: "Successfully Authenticate!",
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ success: "false", password: "Password Is Incorrect" });
      }
    });
  });
});

module.exports = router;
