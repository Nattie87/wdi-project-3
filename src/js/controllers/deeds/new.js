angular
  .module("goodVibes")
  .controller("DeedNewCtrl", DeedNewCtrl);

DeedNewCtrl.$inject = ["Deed", "$state", "$stateParams"];
function DeedNewCtrl(Deed, $state, $stateParams){
  const vm  = this;

    console.log("DeedNewCtrl.$stateParams1", $stateParams);

  // Must be wrapped in a function so that it is not invoked immediately
  // $save is an instance method
  vm.submit = () => {
    console.log("DeedNewCtrl.deed", vm.deed);
    Deed
      .save({ deed: vm.deed })
      .$promise
      .then(data => {
        console.log("DeedNewCtrl.$stateParams2", $stateParams);
        $state.go("usersShow", $stateParams);
      });
  };
}
