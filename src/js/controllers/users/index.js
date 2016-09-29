//this controller is getting the data from the backend
angular
  .module("goodVibes")
  .controller("usersIndexCtrl", usersIndexCtrl);

usersIndexCtrl.$inject = ["User"];
function usersIndexCtrl(User){
  const vm   = this;
  User.query(data => {
    vm.users = data.users;
  });
}
