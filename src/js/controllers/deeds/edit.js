angular
  .module("goodVibes")
  .controller("DeedEditCtrl", DeedEditCtrl);

DeedEditCtrl.$inject = ["Deed", "$stateParams", "$state"];
function DeedEditCtrl(Deed, $stateParams, $state){
  const vm = this;

  Deed.get($stateParams, data => {
    vm.deed = data.deed;
  });

  vm.submit = () => {
    console.log("vm.deed", vm.deed);
    Deed
      .update($stateParams, { deed: vm.deed })
      .$promise
      .then(data => {
        $state.go("deedShow", $stateParams);
      });
  };
}
