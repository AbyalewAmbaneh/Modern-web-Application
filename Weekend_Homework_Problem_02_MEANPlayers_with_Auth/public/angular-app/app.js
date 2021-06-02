angular
  .module("meanPlayers", ["ngRoute", "angular-jwt"])
  .config(config)
  .run(run);

function config($routeProvider, $locationProvider) {
  console.log("Reached app.js");
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/welcome/welcome.html",
    })
    .when("/register", {
      templateUrl: "angular-app/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/login", {
      templateUrl: "angular-app/login/login.html",
      controller: "LoginController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/players", {
      templateUrl: "angular-app/player-list/player-list.html",
      controller: "PlayersController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/players/:id", {
      templateUrl: "angular-app/player-one/player-one.html",
      controller: "PlayerController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/profile", {
      templateUrl: "angular-app/profile/profile.html",
      access: { restricted: true },
    })
    .otherwise({
      redirectTo: "/",
    });
}
function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on(
    "$routeChangeStart",
    function (event, nextRoute, currentRoute) {
      // This enable overcoming restricted URls
      if (
        nextRoute.access !== undefined &&
        nextRoute.access.restricted &&
        !$window.sessionStorage.token &&
        !AuthFactory.auth.isLoggedIn
      ) {
        event.preventDefault();
        $location.path("/");
      }
    }
  );
}
