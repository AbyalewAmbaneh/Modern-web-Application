angular
  .module("meanPlayers")
  .controller("PlayersController", PlayersController);

function PlayersController(PlayerFactory) {
  const vm = this;
  vm.title = "Mean Player App";
  PlayerFactory.getTenPlayers().then(function (response) {
    vm.players = response;
  });
}
