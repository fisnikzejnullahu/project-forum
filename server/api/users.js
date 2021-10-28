var express = require("express");
var router = express.Router();
var User = require("../models/User.js");
var passport = require("passport");
require("../config/passport")(passport);
var httpUtils = require("./utils");

// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     var token = httpUtils.getToken(req.headers);
//     if (token) {
//       User.find((err, users) => {
//         if (err) return next(err);
//         res.json(users);
//       });
//     } else {
//       return res.status(403).send({ success: false, msg: "Unauthorized!" });
//     }
//   }
// );

router.get("/", (req, res) => {
  var users = [];
  for (let i = 0; i < 5; i++) {
    let user = {
      name: "user " + i
    };
    users.push(user);
  }
  res.json(users);
});

router.get("/:id", (req, res, next) => {
  User.find(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var token = httpUtils.getToken(req.headers);
    if (token) {
      User.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.put("/:id", (req, res, next) => {
  User.edit(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", (req, res, next) => {
  User.delete(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
