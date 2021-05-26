angular.module("meanGames").controller("GamesController", GamesController);

// function GamesController($http) {
//   const vm = this;
//   vm.title = "Mean Games App";

//   $http.get("/api/games").then(function (response) {
//     vm.games = response.data;
//   });
// }

function GamesController(GameFactory) {
  const vm = this;
  vm.title = "Mean Games App";
  GameFactory.getTenGames().then(function (response) {
    vm.games = response;
  });
}
