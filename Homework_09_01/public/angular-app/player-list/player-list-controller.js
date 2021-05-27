angular
  .module("meanPlayers")
  .controller("PlayersController", PlayersController);

function PlayersController(PlayerFactory, $route) {
  const vm = this;
  vm.title = "Mean Player App";
  PlayerFactory.getTenPlayers().then(function (response) {
    vm.players = response;
  });

  vm.addPlayer = function () {
    const newPlayer = {
      first_name: vm.newPlayer.first_name,
      last_name: vm.newPlayer.last_name,
      position: vm.newPlayer.position,
    };
    if (vm.playerForm.$valid) {
      console.log(newPlayer.first_name);
      PlayerFactory.addOnePlayer(newPlayer)
        .then(function (response) {
          console.log("Player Saved", response);
          $route.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
