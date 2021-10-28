var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  id: String,
  content: String,
  user_id: String,
  post_id: String,
  // votes: Number,
  created_at: Date
});

module.exports = mongoose.model("Comment", CommentSchema);
