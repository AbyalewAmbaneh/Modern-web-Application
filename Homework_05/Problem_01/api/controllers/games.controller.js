//const { ObjectID } = require("mongodb");
//const dBconnection = require("../../data/dbconnection");

const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.gamesGetAll = function (req, res) {
  var offset = 0;
  var count = 5;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    offset = parseInt(req.query.count, 10);
  }
  Game.find().exec(function (err, games) {
    console.log("Found games", games.length);
    res.json(games);
  });
};

module.exports.gamesGetOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    res.status(200).json(game);
  });
};

module.exports.gameAddOne = function (req, res) {
  Game.create(
    {
      title: req.body.title,
      year: parseInt(req.body.year),
      rate: parseInt(req.body.rate),
      price: parseFloat(req.body.title),
      minPlayers: parseInt(req.body.minPlayers),
      maxPlayers: parseInt(req.body.maxPlayers),
      minAge: parseInt(req.body.minAge),
      designer: req.body.designer,
    },
    function (err, newGame) {
      if (err) {
        console.log("Error creating games");
        res.status(400).json(err);
      } else {
        console.log("Game created ", newGame);
        res.status(201).json(newGame);
      }
    }
  );
};

module.exports.gamesUpdateOne = function (req, res) {
  Game.findById(req.params.gameId)
    .select(-reviews - publisher)
    .exec(function (err, updatedgame) {
      const response = { status: 204 };
      if (err) {
        console.log("Error finding game");
        response.status = 500;
        response.message = err;
      } else if (!updatedgame) {
        response.status = 404;
        response.message = { message: "Game ID not found" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        updatedgame.title = req.body.title;
        updatedgame.year = parseInt(req.body.year);
        updatedgame.price = parseFloat(req.body.price);
        updatedgame.designer = req.body.designer;
        updatedgame.minPlayers = parseInt(req.body.minPlayers);
        updatedgame.maxPlayers = parseInt(req.body.maxPlayers);
        updatedgame.rate = parseFloat(req.body.rate);
        updatedgame.minAge = parseInt(req.body.minAge);

        updatedgame.save(function (err, updatedgame) {
          if (err) {
            response.status = 500;
            response.message = err;
          }
          res.status(response.status).json(updatedgame);
        });
      }
    });
};

module.exports.gameDeleteOne = function (req, res) {
  Game.findByIdAndRemove(req.params.gameId).exec(function (err, deletedGame) {
    const response = { status: 204 };
    console.log("DELETE gameId ", gameId);

    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!deletedGame) {
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      res.status(response.status).json(deletedGame);
    }
  });
};
