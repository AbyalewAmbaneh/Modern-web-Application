const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");
const controllerPublisher = require("../controllers/publishers.controller");

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerGames.gameAddOne);

router
  .route("/games/:gameId")
  .get(controllerGames.gamesGetOne)
  .put(controllerGames.gamesUpdateOne)
  .delete(controllerGames.gameDeleteOne);

router
  .route("/games/:gameId/publisher")
  .get(controllerPublisher.publisherGet)
  .post(controllerPublisher.publisherAdd);

module.exports = router;
