angular.module("angularApp", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "public/main.html",
    controller: "MainController",
    controllerAs: "mainCtrl",
  });
}
