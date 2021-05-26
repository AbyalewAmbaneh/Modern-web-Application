angular.module("meanPlayers").controller("PlayerController", PlayerController);

function PlayerController(PlayerFactory, $routeParams) {
  const vm = this;
  let playerId = $routeParams.id;
  PlayerFactory.getOnePlayer(playerId).then(function (response) {
    vm.players = response;
  });
}
