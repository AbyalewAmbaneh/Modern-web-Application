angular.module("meanPlayers", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/player-list/player-list.html",
      controller: "PlayersController",
      controllerAs: "vm",
    })
    .when("/players/:id", {
      templateUrl: "angular-app/player-one/player-one.html",
      controller: "PlayerController",
      controllerAs: "vm",
    });
}
