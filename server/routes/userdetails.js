const router = require("express").Router();
const verify = require("./verifytoken");
const UserDetails = require("../models/User");
router.get(
  "/",
  verify,

  async (req, res) => {
    //Finding the user
    console.log("Request for user details");
    const user = await UserDetails.findOne({ _id: req.id._id });
    if (!user) return res.status(400).send({ msg: "User Not Found" });

    // Check if item already exists   //To be implemented
    // const emailExist = await SellerDetails.findOne({ email: req.body.Email });
    // if (emailExist)
    //   return res.status(400).send({ msg: "Email Already Registered" });

    res.status(200).send({ msg: user });
  }
);
module.exports = router;
