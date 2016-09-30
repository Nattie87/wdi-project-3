angular
  .module("goodVibes")
  .controller("DeedNewCtrl", DeedNewCtrl);

DeedNewCtrl.$inject = ["Deed", "$state"];
function DeedNewCtrl(Deed, $state){
  const vm  = this;

  // Must be wrapped in a function so that it is not invoked immediately
  // $save is an instance method
  vm.submit = () => {
    Deed
      .save({ deed: vm.deed })
      .$promise
      .then(data => {
        $state.go("deedIndex");
      });
  };
}
