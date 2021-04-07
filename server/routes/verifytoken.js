const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  var token = req.header("user-auth-token");

  if (!token) return res.status(401).send({ msg: "Access Denied" });
  try {
    console.log("token Verified");
    const verified = jwt.verify(token, "tghfythvh");
    req.id = verified;
    next();
  } catch (error) {
    console.log("Invalid Token");
    res.status(400).send({ msg: "Invalid Token" });
  }
};
