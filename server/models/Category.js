var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String
});

module.exports = mongoose.model("Category", CategorySchema);
