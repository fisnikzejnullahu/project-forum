var passport = require("passport");
var settings = require("../config/settings");
require("../config/passport")(passport);
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../models/user");

// router.get("/", (req, res, next) => {
//   var user = {
//     username: "fisnikzz",
//     password: "123456"
//   };

//   User.create(user, (err, post) => {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

router.post("/signup", (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Username and password are required!" });
  } else {
    if (req.body.username === "" || req.body.password === "") {
      res.json({ success: true, msg: "Username and password are required!" });
    }
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      register_date: new Date(),
      role: req.body.role
    });

    newUser.save(err => {
      if (err) {
        console.log("errrrrr " + err);

        return res.json({ success: false, msg: "Username already exists." });
      }
      res.json({ success: true, msg: "User created successfully!" });
    });
  }
});

router.post("/login", (req, res, next) => {
  console.log(
    "***************************************------------------------"
  );
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(
    "***************************************------------------------"
  );

  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) {
        console.log("ERRRROROROROORORORORO");
        console.log(err);
        return next(err);
      }

      if (!user) {
        res.status(401).send({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (err) {
            return next(err);
          }
          console.log("SPASKA ERROR");

          if (isMatch && !err) {
            console.log("OKI");

            var token = jwt.sign(user.toJSON(), settings.secret);
            res.json({ success: true, token: "JWT " + token, user: user });
          } else {
            console.log("KEQ PW");

            res.status(401).send({
              success: false,
              message: "Authentication failed. Wrong password."
            });
          }
        });
      }
    }
  );
});

module.exports = router;
