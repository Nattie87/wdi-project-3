angular
  .module("goodVibes")
  .controller("usersEditCtrl", usersEditCtrl);

usersEditCtrl.$inject = ["User", "$stateParams", "$state"];
function usersEditCtrl(User, $stateParams, $state){
  const vm = this;

  User.get($stateParams, data => {
    vm.user = data.user;
    console.log("vm.user", vm.user);
  });


  vm.submit = () => {
    console.log("submit edit");
    User
      .update($stateParams, { user: vm.user })
      .$promise
      .then(data => {
        $state.go("usersShow", $stateParams);
      });
  };
}
