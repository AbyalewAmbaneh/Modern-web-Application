const express = require("express");
const router = express.Router();

const playersController = require("../controllers/players.controller");
const teamsController = require("../controllers/teams.controller");
const currentTeamController = require("../controllers/current.team.controller");
const userController = require("../controllers/user.controller");

router
  .route("/players")
  .get(playersController.playersGetAll)
  .post(playersController.playerAddOne);

router
  .route("/players/:playerId")
  .get(playersController.playerGetOne)
  .put(playersController.playerUpdateOne)
  .delete(playersController.playerDeletOne);

router
  .route("/players/:playerId/teams")
  .get(teamsController.playerGetAllTeams)
  .post(teamsController.playerAddOneTeam);

router
  .route("/players/:playerId/teams/:teamId")
  .get(teamsController.playerGetOneTeam)
  .put(teamsController.playerUpdateTeam)
  .delete(teamsController.playerDeleteTeam);

router
  .route("/players/:playerId/currentteam")
  .get(currentTeamController.playerGetCurrentTeam)
  .post(currentTeamController.playerAddCurrentTeam)
  .put(currentTeamController.playerUpdateCurrentTeam);

router
  .route("/players/:playerId/currentteam/:currentteamId")
  .delete(currentTeamController.playerDeleteCurrentTeam);

router.route("/players/position").post(playersController.playerGetByPosition);

router.route("/user").post(userController.usersRegistration);
router.route("/auth").post(userController.usersAthenticate);

module.exports = router;
