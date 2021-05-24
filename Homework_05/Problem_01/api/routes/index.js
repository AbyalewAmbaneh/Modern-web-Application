const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerGames.gameAddOne);

router
  .route("/games/:gameId")
  .get(controllerGames.gamesGetOne)
  .put(controllerGames.gamesUpdateOne)
  .delete(controllerGames.gameDeleteOne);

router.route("/games");

module.exports = router;
