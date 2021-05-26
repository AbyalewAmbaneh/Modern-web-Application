angular.module("meanGames").controller("GameController", GameController);

function GameController(GameFactory, $routeParams) {
  const vm = this;
  let gameId = $routeParams.id;
  GameFactory.getOneGame(gameId).then(function (response) {
    vm.games = response;
  });
}
