const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");
const controllerPublisher = require("../controllers/publishers.controller");
const controllerUsers = require("../controllers/user.controller");

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerUsers.authenticate, controllerGames.gameAddOne);

router
  .route("/games/:gameId")
  .get(controllerGames.gamesGetOne)
  .put(controllerUsers.authenticate, controllerGames.gamesUpdateOne)
  .delete(controllerUsers.authenticate, controllerGames.gameDeleteOne);

router
  .route("/games/:gameId/publisher")
  .get(controllerPublisher.publisherGet)
  .post(controllerUsers.authenticate, controllerPublisher.publisherAdd);

router.route("/user").post(controllerUsers.usersRegister);

router.route("/auth").post(controllerUsers.usersAthenticate);

module.exports = router;
