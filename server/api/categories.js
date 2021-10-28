var express = require("express");
var router = express.Router();
var Category = require("../models/category");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var settings = require("../config/settings");
require("../config/passport")(passport);
var httpUtils = require("./utils");

router.get("/", (req, res) => {
  Category.find((err, categories) => {
    if (err) return next(err);
    res.json({ success: true, categories });
  });
});

router.get("/:id", function(req, res, next) {
  Category.findById(req.params.id, function(err, category) {
    if (err)
      return res.json({
        success: false,
        message: "Category with id '" + req.params.id + "', was not found!"
      });
    res.json({
      success: true,
      category
    });
  });
});

router.get("/del", (req, res, next) => {
  Category.deleteMany({}, (err, categories) => {
    if (err) return next({ success: false, message: err });
    res.json({ success: true, delete: categories });
  });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = httpUtils.getToken(req.headers);
    if (token) {
      var decoded = jwt.verify(token, settings.secret);
      if (decoded.role === "Admin") {
        Category.create(req.body, (err, category) => {
          if (err) {
            return res.json({
              success: false,
              message: "Category with this name already exists."
            });
          }
          res.json({ success: true, category });
        });
      } else {
        return res
          .status(403)
          .send({ success: false, message: "Unauthorized." });
      }
      // Category.create(req.body, (err, category) => {
      //   if (err) return next({ success: false, message: err });
      //   res.json({ success: true, category });
      // });
    } else {
      return res.status(403).send({ success: false, message: "Unauthorized." });
    }
  }
);

router.put("/:id", (req, res, next) => {
  Category.findByIdAndUpdate(req.params.id, req.body, function(err, category) {
    if (err) return next(err);
    res.json({ success: true, category });
  });
});

router.delete("/:id", (req, res, next) => {
  Category.deleteOne({ _id: req.params.id }, err => {
    if (err) return next({ success: false, message: err });
    res.json({ success: true, message: "Deleted successfully!" });
  });
});

// router.get("/deleteall", (req, res, next) => {
//   // Category.deleteMany({ title: "StringSStringS" }, function(err) {
//   //   if (err) {
//   //     console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR " + err);

//   //     return next({ err: err });
//   //   }
//   res.json({ delete: "categories" });
//   // });
// });

module.exports = router;
