angular
  .module("goodVibes")
  .controller("MyTasksCtrl", MyTasksCtrl);

MyTasksCtrl.$inject = ["Deed", "CurrentUserService"];
function MyTasksCtrl(Deed, CurrentUserService){
  const vm = this;
  vm.user = CurrentUserService.getUser();

  console.log(vm.user);

  Deed.query_for_user({ id: vm.user.id })
    .$promise
    .then(data => {
      vm.deeds = data.deeds;
    });

}
