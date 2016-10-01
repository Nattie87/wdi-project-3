angular
  .module("goodVibes")
  .controller("usersShowCtrl", usersShowCtrl);

usersShowCtrl.$inject = ["User", "$stateParams", "$state"];
function usersShowCtrl(User, $stateParams, $state){
  const vm   = this;
  User.query($stateParams,data => {
    vm.users = [data.user];
    console.log("usersShowCtrl.users", vm.users);
  });

  vm.goToNewDeed = () => {
    event.preventDefault();
    console.log("goToNewDeed");
    $state.go("deedNew");
  };
}

 // add edit and delete functions here??
