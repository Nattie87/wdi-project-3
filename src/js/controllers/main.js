angular
  .module("goodVibes")
  .controller("mainCtrl", mainCtrl);

mainCtrl.$inject = ["User", "$rootScope", "CurrentUserService", "$state", "$stateParams"];
function mainCtrl(User, $rootScope, CurrentUserService, $state, $stateParams) {
  const vm = this;

  vm.user = CurrentUserService.getUser();

  vm.logout = () => {
    event.preventDefault();
    CurrentUserService.clearUser();
  };

  vm.usersShow = (user) => {
    User.get($stateParams, user => {
      $state.go("usersShow");
    });

  };

  $rootScope.$on("loggedIn", () => {
    vm.user = CurrentUserService.getUser();
    $state.go("usersIndex");
  });

  $rootScope.$on("loggedOut", () => {
    vm.user = null;
    $state.go("home");
  });
}
