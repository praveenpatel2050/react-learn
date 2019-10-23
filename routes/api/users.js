const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");

//load User model for Check Email
const User = require("../../models/Users");

//@route    api/users/test
//@desc     Test API
//@access   Public
//@Type     Get
router.get("/test", (req, res) => res.json({ msg: "User is Working Good" }));

//@route    api/users/register
//@desc     User Registeration  API
//@access   Public
//@Type     Post
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log("isValid", isValid);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email Already Exists!";
      return res.status(400).json(errors);
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

//@route    api/users/login
//@desc     User Login  API
//@Type     Post
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

//@route    api/users/current
//@desc     Current User  API
//@Type     Get
//@access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      success: "true",
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
