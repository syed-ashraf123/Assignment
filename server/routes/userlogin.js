const router = require("express").Router();
const userdetails = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
  "/",

  async (req, res) => {
    //Email present or not
    const user = await userdetails.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ msg: "Email not registered" });

    //Password is correct or not
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ msg: "Password is Wrong" });

    // Create and assign token
    const token = jwt.sign({ _id: user._id }, "tghfythvh");
    res.header("user-auth-token", token);
    res.status(200).send({ msg: token, data: user });
  }
);
module.exports = router;
