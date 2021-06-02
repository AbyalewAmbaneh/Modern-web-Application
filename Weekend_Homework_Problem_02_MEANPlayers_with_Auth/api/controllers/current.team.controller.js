const mongoose = require("mongoose");
const Player = mongoose.model("Player");

module.exports.playerGetCurrentTeam = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Player.findById(req.params.playerId)
    .select("current_team")
    .exec(function (err, player) {
      if (err) {
        __res(500, err);
        return;
      }
      if (!player) {
        __res(404, "Player is not found");
        return;
      } else {
        res.status(200).json(player.current_team);
      }
    });
};

module.exports.playerAddCurrentTeam = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Player.findById(req.params.playerId)
    .select("current_team")
    .exec(function (err, player) {
      if (err) {
        __res(500, err);
        return;
      }
      if (!player) {
        __res(400, "player id not found");
        return;
      } else {
        player.current_team = {};
        player.current_team.name = req.body.name;
        player.current_team.stadium = req.body.stadium;

        player.save(function (err, team) {
          if (err) {
            __res(500, err);
            return;
          } else {
            console.log("Successfully added", team);
            res.status(204).json(team);
          }
        });
      }
    });
};

module.exports.playerUpdateCurrentTeam = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });
  Player.findById(req.params.playerId)
    .select("current_team")
    .exec(function (err, player) {
      if (err) {
        __res(500, err);
        return;
      }
      if (!player) {
        __res(400, "player id not found");
        return;
      } else {
        player.current_team.name = req.body.name;
        player.current_team.stadium = req.body.stadium;
        player.save(function (err, team) {
          if (err) {
            __res(500, err);
            return;
          } else {
            console.log("Successfully updated", team);
            res.status(204).json(team);
          }
        });
      }
    });
};

module.exports.playerDeleteCurrentTeam = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Player.findById(req.params.playerId)
    .select("current_team")
    .exec(function (err, player) {
      player.current_team.remove();
      if (err) {
        __res(500, err);
        return;
      }

      if (!player) {
        __res(400, "team id not found");
        return;
      }

      player.save(function (err, player) {
        if (err) {
          __res(500, err);
          return;
        }
        console.log("successfully deleted", player);
        res.status(204).json(player);
      });
    });
};
