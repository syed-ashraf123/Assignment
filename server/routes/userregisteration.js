const router = require("express").Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const User = require("../models/User");
const { userValidation } = require("../validation/userValidation");
const bcrypt = require("bcryptjs");
const fs = require("fs");

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

    //Check if username already exists
    const userExist = await User.findOne({ username: req.body.UserName });
    if (userExist)
      return res.status(400).send({ msg: "User Already Registered" });

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    let sampleFile;
    let uploadPath;
    let base64String = req.body.Image;
    let base64Image = base64String.split(";base64,").pop();
    let date = Date.now();
    // console.log("Imaaaaaage", req.body.Image);
    fs.writeFile(
      __dirname + "/uploads/" + date + ".png",
      base64Image,
      { encoding: "base64" },
      function (err) {
        console.log("File created");
      }
    );
    const image_name = date;

    new User({
      fullname: req.body.Name,
      username: req.body.UserName,
      email: req.body.Email,
      password: hashedPassword,
      image: date,
    }).save();

    res.status(200).send({ Success: "Posted" });
  }
);
module.exports = router;
