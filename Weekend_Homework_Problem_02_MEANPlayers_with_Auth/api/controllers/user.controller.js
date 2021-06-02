const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

module.exports.usersRegistration = function (req, res) {
  const newUser = {
    name: req.body.name || null,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
  };

  User.create(newUser, function (err, user) {
    const response = {
      status: 201,
      message: user,
    };
    if (err) {
      console.log(err);
      response.status = 400;
      response.message = err;
    } else {
      console.log("User Created");
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.usersAthenticate = function (req, res) {
  console.log("Autheticate User");
  const authUser = {
    username: req.body.username,
  };
  User.findOne(authUser).exec(function (err, user) {
    const response = {
      status: 200,
      message: user,
    };
    if (err) {
      console.log(err);
      response.status = 400;
      response.message = err;
    } else if (!user) {
      console.log("no user in Db with this user name and password");
      response.status = 404;
      response.message = err;
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log("User Authenticated");
        const token = jwt.sign({ user: user.name }, "secretKey", {
          expiresIn: 3600,
        });
        response.message = {
          success: true,
          token: token,
        };
      } else {
        console.log("Unauthorized");
        response.status = 401;
        response.message = { message: "Unauthorized" };
      }
    }
    res.status(response.status).json(response.message);
  });
};
