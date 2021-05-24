const mongoose = require("mongoose");
const Player = mongoose.model("Player");

module.exports.playersGetAll = function (req, res) {
  Player.find().exec(function (err, players) {
    console.log("Found Players ", players.length);
    res.status(200).json(players);
  });
};

module.exports.playerGetOne = function (req, res) {
  __res = (status, msg) => res.status(status).json(msg);

  Player.findById(req.params.playerId).exec(function (err, player) {
    if (err) {
      console.log("Player cannot be Updated");
      __res(500, err);
      return;
    } else if (!player) {
      console.log("Player Id is not found");
      __res(404, err);
      return;
    } else {
      res.status(200).json(player);
    }
  });
};

module.exports.playerAddOne = function (req, res) {
  __res = (status, msg) => res.status(status).json(msg);
  Player.create(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      position: req.body.position,
    },
    function (err, player) {
      if (err) {
        console.log("Error creating Player");
        __res(404, err);
      } else {
        console.log("Player created", player);
        res.status(201).json(player);
      }
    }
  );
};

module.exports.playerUpdateOne = function (req, res) {
  __res = (status, msg) => res.status(status).json(msg);

  Player.findById(req.params.playerId).exec(function (err, player) {
    if (err) {
      console.log("Player cannot be Updated");
      __res(500, err);
      return;
    } else if (!player) {
      console.log("Player Id is not found");
      __res(404, err);
      return;
    }
    player.first_name = req.body.first_name;
    player.last_name = req.body.last_name;
    player.position = req.body.position;

    player.save(function (err, updatedPlayer) {
      if (err) {
        console.log("Player cannot be Updated");
        __res(500, err);
        return;
      } else {
        console.log("Player updated");
        res.status(204).json(updatedPlayer);
      }
    });
  });
};

module.exports.playerDeletOne = function (req, res) {
  __res = (status, msg) => res.status(status).json(msg);

  Player.findByIdAndRemove(req.params.playerId).exec(function (err, player) {
    if (err) {
      console.log("Error deleting player");
      __res(500, err);
      return;
    }
    if (!player) {
      console.log("player Id is not found");
      __res(404, err);
    } else {
      console.log("successfully deleted", player);
      res.status(204).json(player);
    }
  });
};
