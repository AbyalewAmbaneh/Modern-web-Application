angular.module("meanGames").controller("GameController", GameController);

function GameController(GameFactory, $routeParams, AuthFactory) {
  const vm = this;
  const gameId = $routeParams.id;
  GameFactory.getOneGame(gameId).then(function (response) {
    vm.games = response;
  });

  vm.RemoveOneGame = function () {
    GameFactory.removeOneGame(gameId)
      .then(function (response) {
        console.log("Game Removed ", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  vm.isLoggedIn = function () {
    return AuthFactory.auth.isLoggedIn;
  };
}
