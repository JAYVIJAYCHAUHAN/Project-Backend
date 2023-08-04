const mongoose = require("mongoose");

module.exports = mongoose.model("Services22", {
  title: String,
  description: String,
  imageUrl:String,
  place:String,
  SetDate:String,
});


 