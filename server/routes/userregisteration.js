const router = require("express").Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const User = require("../models/User");
const { userValidation } = require("../validation/userValidation");
const bcrypt = require("bcryptjs");

router.post(
  "/",

  async (req, res) => {
    // try {
    console.log("Request Came");
    //Validation
    const { error } = userValidation(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });

    //Check if mail already exists
    const emailExist = await User.findOne({ email: req.body.Email });
    if (emailExist)
      return res.status(400).send({ msg: "Email Already Registered" });

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    new User({
      firstname: req.body.First_Name,
      lastname: req.body.Last_Name,
      email: req.body.Email,
      password: hashedPassword,
      dob: req.body.Date,
    }).save();
    res.status(200).send({ Success: "Posted" });
  }
);
module.exports = router;
