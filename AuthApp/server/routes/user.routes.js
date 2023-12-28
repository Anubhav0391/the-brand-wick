const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password} = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).send({"err":err})
      } else {
        const existing = await UserModel.findOne({ email });
        if (existing) {
          res.status(200).send({ "msg": "Email is already registered. Please try with another email !" });
        } else {
          let user = new UserModel({
            name,
            email,
            gender,
            password: hash,
          });
          await user.save();
          res.status(200).send({ "msg": "Registered Successfully"});
        }
      }
    });
  } catch (err) {
    res.status(400).send({"err":err.message});
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    
    if (user) {
      bcrypt.compare(password, user.password, (_, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id, user:user.name }, process.env.key);
          res.status(200).send({
            "msg": `Login Successfull`,
            "token": token,
            "user":user
          });
        } else {
          res.status(200).send({ "msg": "Wrong Password" });
        }
      });
    } else {
      res.status(200).send({ "msg": `${email} is not registered.` });
    }
  } catch (err) {
    res.status(400).send({ "err": err.message });
  }
});

module.exports = userRouter;