const mongoose = require("mongoose");
const Publisher = mongoose.model("Game");

module.exports.publisherGet = function (req, res) {
  const response = { status: 200 };
  Publisher.findById(req.params.gameId)
    .select("publisher")
    .exec(function (err, game) {
      if (err) {
        console.log("Error finding game");
        response.status = 500;
        response.message = err;
      } else if (!game) {
        console.log("Game id not found in database");
        response.status = 404;
        response.message = { message: "Game ID not found" };
      } else {
        response.message = game.publisher ? game.publisher : [];
      }
      res.status(response.status).json(response.message);
    });
};

const _addPublisher = function (req, res, game) {
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.save(function (err, updatedGame) {
    const response = { status: 200, message: [] };
    if (err) {
      reponse.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedGame.publisher;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publisherAdd = function (req, res) {
  console.log("Get gameId ", req.params.gameId);
  const response = { status: 200 };
  Publisher.findById(req.params.gameId).exec(function (err, game) {
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      console.log("Game id not found in database", id);
      response.status = 404;
      response.message = { message: "Game ID not found" + gameId };
    }
    if (game) {
      _addPublisher(req, res, game);
    } else {
      res.status(response.status).json(response.message);
    }
  });
};
