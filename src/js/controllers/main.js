angular
  .module("goodVibes")
  .controller("mainCtrl", mainCtrl);

mainCtrl.$inject = ["User", "Deed", "$rootScope", "CurrentUserService", "$state", "$stateParams"];
function mainCtrl(User, Deed, $rootScope, CurrentUserService, $state, $stateParams) {
  const vm = this;

  vm.user = CurrentUserService.getUser();

  vm.logout = () => {
    event.preventDefault();
    CurrentUserService.clearUser();
  };

  vm.usersShow = (user) => {
    User.get($stateParams, user => {
      $stateParams.id = vm.user.id;
      $state.go("usersShow", $stateParams);
    });
  };


  $rootScope.$on("loggedIn", () => {
    vm.user = CurrentUserService.getUser();
    console.log("logged in", vm.user);
    // $state.go("usersIndex");
  });

  $rootScope.$on("loggedOut", () => {
    vm.user = null;
    $state.go("home");
  });
}
