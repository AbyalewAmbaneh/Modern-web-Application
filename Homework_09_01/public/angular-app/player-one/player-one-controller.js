angular.module("meanPlayers").controller("PlayerController", PlayerController);

function PlayerController(PlayerFactory, $routeParams) {
  const vm = this;
  let playerId = $routeParams.id;
  PlayerFactory.getOnePlayer(playerId).then(function (response) {
    vm.players = response;
  });

  vm.RemoveOnePlayer = function () {
    PlayerFactory.removeOnePlayer(playerId)
      .then(function (response) {
        console.log("Player removed", response);
        // Router.router.navigateByUrl("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
