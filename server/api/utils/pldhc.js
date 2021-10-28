var express = require("express");
var router = express.Router();
var Comment = require("../models/Comment");
var passport = require("passport");
require("../config/passport")(passport);
var httpUtils = require("./utils");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var token = httpUtils.getToken(req.headers);
    if (token) {
      Comment.find((err, comments) => {
        if (err) return next(err);
        res.json(comments);
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized!" });
    }
  }
);

router.get("/post/:postId", (req, res, next) => {
  Comment.find({ post_id: req.params.postId }, (err, comments) => {
    if (err) return next(err);
    res.json({
      success: true,
      comments
    });
  });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var token = httpUtils.getToken(req.headers);
    if (token) {
      Comment.create(req.body, (err, comment) => {
        if (err) return next(err);
        res.json({
          success: true,
          comment
        });
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.delete("/:id", (req, res, next) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err)
      return next({
        success: false,
        message: "Comment with id '" + req.params.id + "', was not found!"
      });
    console.log("FOUNDDDDDD");

    Comment.deleteOne({ _id: req.params.id }, err => {
      if (err) return next(err);
      res.json({
        success: true
      });
    });
  });
});

module.exports = router;
