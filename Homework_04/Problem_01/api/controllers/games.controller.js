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
