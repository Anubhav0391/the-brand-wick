var jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decoded = await jwt.verify(token.split(' ')[1], process.env.key);

    if (decoded) {
      const {userId,user} = decoded;
      req.body.userId = userId;
      req.body.user=user;
      next();
    } else {
      res.status(200).send({ msg: "Please login" });
    }
  } else {
    res.status(200).send({ msg: "Please login" });
  }
};

module.exports = {userAuth};