const mongoose = require("mongoose");
const Player = mongoose.model("Player");

module.exports.playerGetAllTeams = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Player.findById(req.params.playerId)
    .select("teams_played_for")
    .exec(function (err, player) {
      if (err) {
        __res(500, err);
        return;
      }
      if (!player) {
        __res(404, "Player is not found");
        return;
      } else {
        res.status(200).json(player.teams_played_for);
      }
    });
};

module.exports.playerGetOneTeam = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Player.findById(req.params.playerId)
    .select("teams_played_for")
    .exec(function (err, player) {
      if (err) {
        __res(500, err);
        return;
      }
      if (!player) {
        __res(404, "Player is not found");
        return;
      }
      const team = player.teams_played_for.id(req.params.teamId);
      res.status(200).json(team);
    });
};

module.exports.playerAddOneTeam = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Player.findById(req.params.playerId)
    .select("teams_played_for")
    .exec(function (err, player) {
      if (err) {
        __res(500, err);
        return;
      }
      if (!player) {
        __res(400, "player id not found");
        return;
      } else {
        if (!Array.isArray(player.teams_played_for)) {
          player.teams_played_for = [];
        }

        player.teams_played_for.push({
          name: req.body.name,
          stadium: req.body.stadium,
        });

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

module.exports.playerUpdateTeam = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Player.updateOne(
    { _id: req.params.playerId, "teams_played_for._id": req.params.teamId },
    {
      $set: {
        "teams_played_for.$.name": req.body.name,
        "teams_played_for.$.stadium": req.body.stadium,
      },
    },
    function (err, player) {
      if (err) {
        __res(500, err);
        return;
      }
      console.log("team updated", player);
      res.status(204).json(player);
    }
  );
};

module.exports.playerDeleteTeam = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Player.findById(req.params.playerId)
    .select("teams_played_for")
    .exec(function (err, player) {
      player.teams_played_for.id(req.params.teamId).remove();

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
