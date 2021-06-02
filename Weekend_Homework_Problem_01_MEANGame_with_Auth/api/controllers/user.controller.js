const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

module.exports.usersRegister = function (req, res) {
  console.log("Registering User");
  const newUser = {
    name: req.body.name || null, //if the give name its ok kalhone justr give null
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)), //  password: bcrypt.hashSync(req.body.password, 10)
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
    //optional, password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)), but not recommended for Security reasons
  };
  User.findOne(authUser).exec(function (err, user) {
    console.log(user);
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
      console.log("we got the user now lets check the password");
      // mongoo will check the password
      console.log(req.body.password);
      console.log(user.password);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // this guy is authenticated since password and user name matches
        console.log("User Authenticated");
        const token = jwt.sign({ name: user.name }, "secretKey", {
          expiresIn: 3600,
        });
        response.message = {
          success: true,
          token: token,
        };
      } else {
        // the user exist in database but the password doesn't match
        console.log("Unauthorized");
        response.status = 401;
        response.message = { message: "Unauthorized" };
      }
    }
    res.status(response.status).json(response.message);
  });
};

// This method is not yet used
module.exports.authenticate = function (req, res, next) {
  const headerExists = req.headers.authorization;

  if (headerExists) {
    // if there is a token then we have to very if it is correct
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secretKey", function (err, decoded) {
      if (err) {
        // verfication did't pass meaning token was invalid
        console.log(err);
        res.status(401).json({ message: "Unauthorized" });
      } else {
        // token is valid so this middle ware will let you to the site (like gate is opened now)
        req.user = decoded.user; // from the jwt token payload i decode the name so that i can use it later on my hello screen;
        next();
      }
    });
  } else {
    // if no token in the header then return a message you are ot logged in
    res
      .status(403)
      .json({ message: "no token provided / you are not logged in" });
  }
};
