const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const CryptoJs = require("crypto-js");
const multer = require("multer");
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const { sendUpdatePasswordEmail } = require("../EmailService/updatePassword");
const { sendResetPasswordEmail } = require("../EmailService/resetPassword");
dotenv.config();

//UPDATE

router.put("/:id", async (req, res) => {
  let unencryptedPassword = req.body.password;
  if (req.body.password) {
    password = req.body.password;
    req.body.password = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
  
      if(req.body.email && unencryptedPassword){
        await sendUpdatePasswordEmail(req.body.email, unencryptedPassword);
      }
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("The user has been deleted");
  } catch (error) {
    res.status(500).json("You are not authorized for this operation");
  }
});

// GET A USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL USERS

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USERS STATS

router.get("/stats", async (req, res) => {
  const date = new Date();

  const lastYear = new Date(date.setFullYear(date.getFullYear - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },

      {
        $project: {
          month: { $month: "createdAt" },
        },
      },

      {
        $group: {
          _id: "$month",

          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// reset password

router.post("/reset", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(401).json("Staff not found");
    }
    await sendResetPasswordEmail(req.body.email);
    res.status(200).json('Reset link has been sent');
  } catch (error) {
    res.status(500).json("Something went wrong.");
  }
});

router.post("/update-password", async(req,res) =>{

  try {
    const user = await User.findOne({staffID:req.body.staffID});
  
    if (!user) {
      return res.status(404).json("Staff not found");
    }
    const encryptedPassword = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString();

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: {password: encryptedPassword}, },
      {new: true}
    );
 
    await sendUpdatePasswordEmail(user.email,req.body.password);
    res.status(201).json(updatedUser)

  } catch (error) {
    res.status(500).json('Something went wrong');
  }
})

module.exports = router;
