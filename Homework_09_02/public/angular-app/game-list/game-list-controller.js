angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameFactory, $route) {
  const vm = this;
  vm.title = "Mean Games App";
  GameFactory.getTenGames().then(function (response) {
    vm.games = response;
  });

  vm.addGame = function () {
    const newGame = {
      rate: vm.newGameRating,
      title: vm.newGameTitle,
      year: vm.newGameYear,
      price: vm.newGamePrice,
      minPlayers: vm.newGameMinPlayers,
      maxPlayers: vm.newGameMaxPlayers,
      minAge: vm.newGameMinAge,
      designers: vm.newGameDesigner,
    };

    if (vm.gameForm.$valid) {
      console.log(newGame);
      GameFactory.addOneGame(newGame)
        .then(function (response) {
          console.log("Game Saved", newGame);
          $route.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
