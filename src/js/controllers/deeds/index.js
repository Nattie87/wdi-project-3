angular
  .module("goodVibes")
  .controller("DeedIndexCtrl", DeedIndexCtrl);

DeedIndexCtrl.$inject = ["Deed"];
function DeedIndexCtrl(Deed){
  const vm = this;

  Deed
    .query()
    .$promise
    .then(data => {
      vm.deeds = data.deeds;
    });
}
