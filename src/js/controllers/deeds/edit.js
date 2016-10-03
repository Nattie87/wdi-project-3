angular
  .module("goodVibes")
  .controller("DeedEditCtrl", DeedEditCtrl);

DeedEditCtrl.$inject = ["Deed", "$stateParams", "$state"];
function DeedEditCtrl(Deed, $stateParams, $state){
  const vm = this;

  Deed.get($stateParams, data => {
    vm.Deed = data.Deed;
  });

  vm.submit = () => {
    console.log("vm.deed", vm.Deed);
    Deed
      .update($stateParams, { Deed: vm.Deed })
      .$promise
      .then(data => {
        $state.go("deedShow", $stateParams);
      });
  };
}
