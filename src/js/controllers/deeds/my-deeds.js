angular
  .module("goodVibes")
  .controller("MyDeedsCtrl", MyDeedsCtrl);

MyDeedsCtrl.$inject = ["Deed", "CurrentUserService"];
function MyDeedsCtrl(Deed, CurrentUserService){
  const vm = this;
  vm.user = CurrentUserService.getUser();

  Deed.query_for_user()
    .$promise
    .then(data => {
      console.log(data.deeds)
      vm.deeds = data.deeds;
    });

}
