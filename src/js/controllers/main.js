angular
  .module("goodVibes")
  .controller("mainCtrl", mainCtrl);

mainCtrl.$inject = ["$rootScope", "CurrentUserService", "$state", "$stateParams"];
function mainCtrl($rootScope, CurrentUserService, $state, $stateParams) {
  const vm = this;

  vm.user = CurrentUserService.getUser();

  vm.logout = () => {
    event.preventDefault();
    CurrentUserService.clearUser();
  };

  vm.usersShow = () => {

      $stateParams.userid = vm.user.id;
      $state.go("usersShow", $stateParams);

  };

  vm.showAllDeeds = () => {
    console.log("showAllDeeds");
    event.preventDefault();
    $state.go("deedIndex");
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
