angular
  .module("goodVibes")
  .controller("DeedIndexCtrl", DeedIndexCtrl);

DeedIndexCtrl.$inject = ["Deed", "$stateParams"];
function DeedIndexCtrl(Deed, $stateParams){
  const vm = this;

  Deed
    .query($stateParams)
    .$promise
    .then(data => {
      vm.deeds = data.deeds;
    });
}
