var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true
  },
  description: String,
  created_at: Date,
  user: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  votes: Number
});

module.exports = mongoose.model("Post", PostSchema);
