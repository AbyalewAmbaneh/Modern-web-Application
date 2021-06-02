angular.module("meanPlayers").controller("LoginController", LoginController);

function LoginController(
  $location,
  AuthFactory,
  UserDataFactory,
  $window,
  jwtHelper
) {
  const vm = this;
  vm.loggedinUser = "";
  vm.isActiveTab = function (url) {
    const currentPath = $location.path().split("/")[1];
    if (url === currentPath ? "active" : "");
  };

  vm.isLoggedIn = function () {
    return AuthFactory.auth.isLoggedIn;
  };

  vm.login = function () {
    if (vm.username && vm.password) {
      const user = {
        username: vm.username,
        password: vm.password,
      };
      UserDataFactory.login(user)
        .then(function (response) {
          console.log(response);
          if (response && response.success) {
            $window.sessionStorage.token = response.token;
            AuthFactory.auth.isLoggedIn = true;

            //read the payload from the token

            const token = $window.sessionStorage.token;
            const decodeToken = jwtHelper.decodeToken(token);
            vm.loggedinUser = decodeToken.user;

            vm.username = "";
            vm.password = "";
            $location.path("/");
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };
  vm.logout = function () {
    AuthFactory.auth.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path("/");
  };
}
