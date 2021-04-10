const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullname: String,
  username: String,
  image: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
