angular
  .module("goodVibes")
  .controller("usersShowCtrl", usersShowCtrl);

usersShowCtrl.$inject = ["User", "Deed", "$stateParams", "$state"];
function usersShowCtrl(User, Deed, $stateParams, $state){
  const vm   = this;

  User.query($stateParams,data => {
    vm.user = data.user;
  });

  Deed.query_for_user($stateParams)
    .$promise
    .then(data => {
      vm.deeds = data.deeds;
    });

}

 // add edit and delete functions here??
