const express = require("express");
const router = express.Router();

const auth = require("./auth");
const categories = require("./categories");
const posts = require("./posts");
const comments = require("./comments");

router.use("/auth", auth);
router.use("/categories", categories);
router.use("/posts", posts);
router.use("/comments", comments);

module.exports = router;
