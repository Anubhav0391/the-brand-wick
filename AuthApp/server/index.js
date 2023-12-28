const express = require("express");
const connection = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const {userAuth} = require("./middlewares/auth");
const UserModel = require("./models/user.model");
require("dotenv").config();
const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.use(userAuth);

app.use("/verifyAuth", async (req, res) => {
  try {
      const user = await UserModel.findById(req.body.userId);
      res.status(200).send(user);
  } catch (err) {
      res.status(400).send({"err":err.message});
  }
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
});