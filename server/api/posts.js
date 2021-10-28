var express = require("express");
var router = express.Router();
var Post = require("../models/Post");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var settings = require("../config/settings");
require("../config/passport")(passport);
var httpUtils = require("./utils");

router.get("/", (req, res) => {
  // var skp = (req.params.pageIndex - 1) * 9;

  // Post.find()
  //   .limit(9)
  //   .skip(skp)
  //   .exec((err, posts) => {
  //     if (err) return next(err);
  //     console.log("------------------------------------------------------");
  //     console.log(skp);
  //     console.log(posts);
  //     console.log("------------------------------------------------------");

  //     res.json({ success: true, posts });
  //   });
  Post.find((err, posts) => {
    if (err) return next(err);
  })
    .sort({ created_at: -1 })
    .exec((err, posts) => {
      if (err) return next(err);
      res.json({ success: true, posts });
    });
});

router.get("/:id", function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err)
      return res.json({
        success: false,
        message: "Post with id '" + req.params.id + "', was not found!"
      });
    res.json({
      success: true,
      post
    });
  });
});

router.get("/del", (req, res, next) => {
  Post.deleteMany({}, (err, posts) => {
    if (err) return next(err);
    res.json({ success: true, delete: posts });
  });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = httpUtils.getToken(req.headers);
    if (token) {
      Post.create(req.body, (err, post) => {
        console.log(
          "------------------------------------------------------------"
        );
        console.log(err);

        console.log(
          "------------------------------------------------------------"
        );

        if (err) return next(err);
        res.json({ success: true, post });
      });
    } else {
      return res.status(403).send({ success: false, message: "Unauthorized." });
    }
  }
);

router.put("/:id", (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json({ success: true, post });
  });
});

router.put("/vote/:id", (req, res, next) => {
  Post.findById(req.params.id, function(err, post) {
    if (err)
      return res.json({
        success: false,
        message: "Post with id '" + req.params.id + "', was not found!"
      });

    var type = req.body.type;
    if (type === "UP") {
      post.votes = post.votes + 1;
    } else if (type === "DOWN") {
      post.votes = post.votes - 1;
    } else {
      res.json({ success: false, message: "someting went wrong!" });
    }

    Post.findByIdAndUpdate(req.params.id, post, (err, post) => {
      if (err) return next(err);
      res.json({ success: true, post });
    });
  });
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = httpUtils.getToken(req.headers);
    if (token) {
      var decoded = jwt.verify(token, settings.secret);
      Post.findById(req.params.id, (err, post) => {
        if (err)
          return next({
            success: false,
            message: err.message
          });

        if (post) {
          if (post.user === decoded.username || decoded.role === "Admin") {
            Post.deleteOne({ _id: req.params.id }, err => {
              if (err) return next(err);
              res.json({
                success: true
              });
            });
          } else {
            return res.status(403).send({
              success: false,
              message: "No permission to delete this post."
            });
          }
        } else {
          res.json({
            success: true,
            message: "Post with id '" + req.params.id + "', was not found!"
          });
        }
      });
    } else {
      return res.status(403).send({ success: false, message: "Unauthorized." });
    }
  }
);

// router.get("/deleteall", (req, res, next) => {
//   // Post.deleteMany({ title: "StringSStringS" }, function(err) {
//   //   if (err) {
//   //     console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR " + err);

//   //     return next({ err: err });
//   //   }
//   res.json({ delete: "posts" });
//   // });
// });

module.exports = router;
