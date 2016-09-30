angular
  .module("goodVibes")
  .controller("usersShowCtrl", usersShowCtrl);

usersShowCtrl.$inject = ["User"];
function usersShowCtrl(User){
  const vm   = this;
  User.query(data => {
    vm.users = data.users;
  });
}

 // add edit and delete functions here??
