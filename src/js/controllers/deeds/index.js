angular
  .module("goodVibes")
  .controller("DeedIndexCtrl", DeedIndexCtrl);

DeedIndexCtrl.$inject = ["Deed", "$stateParams", "CurrentUserService"];
function DeedIndexCtrl(Deed, $stateParams, CurrentUserService){
  const vm = this;
  vm.user = CurrentUserService.getUser();

  Deed
    .query($stateParams)
    .$promise
    .then(data => {
      vm.deeds = data.deeds;
    });

    vm.favourite = (deed) => {
    Deed.favourite({ id: deed._id }, data => {
      console.log(data);
    });
  };
}
