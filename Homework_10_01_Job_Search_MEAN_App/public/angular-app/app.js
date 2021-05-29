angular.module("meanJobs", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/job-list/job-list.html",
      controller: "JobsController",
      controllerAs: "vm",
    })
    .when("/jobs/:id", {
      templateUrl: "angular-app/job-one/job-one.html",
      controller: "JobController",
      controllerAs: "vm",
    });
}
