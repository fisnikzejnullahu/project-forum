var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var settings = require("../config/settings");
require("../config/passport")(passport);
var httpUtils = require("./utils");

router.get("/", (req, res) => {
  Comment.find((err, comments) => {
    if (err) return next(err);
    res.json({ success: true, comments });
  });
});

router.get("/:id", function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err)
      return res.json({
        success: false,
        message: "Comment with id '" + req.params.id + "', was not found!"
      });
    res.json({
      success: true,
      comment
    });
  });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var token = httpUtils.getToken(req.headers);
    if (token) {
      console.log(token);
      Comment.create(req.body, (err, comment) => {
        if (err) return next(err);
        res.json({ success: true, comment });
      });
    } else {
      return res.status(403).send({ success: false, message: "Unauthorized." });
    }
  }
);

router.put("/:id", (req, res, next) => {
  Comment.edit(req.params.id, req.body, (err, comment) => {
    if (err) return next(err);
    res.json({ success: true, comment });
  });
});

router.get("/post/:postId", (req, res, next) => {
  Comment.find({ post_id: req.params.postId }, (err, comments) => {
    if (err) return next(err);
    console.log(comments);

    res.json({
      success: true,
      comments
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
      Comment.findById(req.params.id, (err, comment) => {
        if (err)
          return next({
            success: false,
            message: err.message
          });

        if (comment) {
          if (
            comment.user_id === decoded.username ||
            decoded.role === "Admin"
          ) {
            Comment.deleteOne({ _id: req.params.id }, err => {
              if (err) return next(err);
              res.json({
                success: true
              });
            });
          } else {
            return res.status(403).send({
              success: false,
              message: "No permission to delete this comment."
            });
          }
        } else {
          res.json({
            success: true,
            message: "Comment with id '" + req.params.id + "', was not found!"
          });
        }
      });
    } else {
      return res.status(403).send({ success: false, message: "Unauthorized." });
    }
  }
);

router.get("/del", (req, res, next) => {
  Comment.deleteMany({}, (err, comments) => {
    if (err) return next(err);
    res.json({ success: true, delete: comments });
  });
});

module.exports = router;
