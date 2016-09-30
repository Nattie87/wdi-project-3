angular
  .module("goodVibes")
  .controller("usersShowCtrl", usersShowCtrl);

usersShowCtrl.$inject = ["User", "$stateParams", "$state"];
function usersShowCtrl(User, $stateParams, $state){
  const vm = this;
  
  User.get($stateParams, data => {
    vm.user = data.user;
  });
}


// add edit and delete functions here??
