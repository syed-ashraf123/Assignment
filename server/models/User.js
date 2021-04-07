const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  dob: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
