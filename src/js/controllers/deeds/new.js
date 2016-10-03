angular
  .module("goodVibes")
  .controller("DeedNewCtrl", DeedNewCtrl);

DeedNewCtrl.$inject = ["Deed", "$state", "CurrentUserService"];
function DeedNewCtrl(Deed, $state, CurrentUserService){
  const vm  = this;
  vm.user = CurrentUserService.getUser();


  // Must be wrapped in a function so that it is not invoked immediately
  // $save is an instance method
  vm.submit = () => {
    // assigning a value to the user associated to that deed
    vm.deed.userid = vm.user.id;
    console.log("DeedNewCtrl.deed", vm.deed);
    Deed
      .save({ deed: vm.deed })
      .$promise
      .then(data => {

        $state.go("myTasks");
      });
  };

}
