angular.module("meanPlayers").factory("PlayerFactory", PlayerFactory);

function PlayerFactory($http) {
  return {
    getTenPlayers: getTenPlayers,
    getOnePlayer: getOnePlayer,
  };
  function getTenPlayers() {
    return $http.get("/api/players").then(complete).catch(failed);
  }
  function getOnePlayer(id) {
    //let gameId = $routeParams.id;
    return $http
      .get("/api/players/" + id)
      .then(complete)
      .catch(failed);
  }
  function complete(response) {
    return response.data;
  }
  function failed(error) {
    return error.statusText;
  }
}
