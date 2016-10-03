angular
  .module("goodVibes")
  .controller("DeedIndexCtrl", DeedIndexCtrl);

DeedIndexCtrl.$inject = ["Deed", "$stateParams", "CurrentUserService"];
function DeedIndexCtrl(Deed, $stateParams, CurrentUserService){
  const vm = this;
  vm.user = CurrentUserService.getUser();
  vm.swipedLeft  = swipedLeft;
  vm.swipedRight = swipedRight;

  Deed
    .query($stateParams)
    .$promise
    .then(data => {
      vm.deeds = data.deeds;
    });

    function swipedLeft(deed) {
      deed.animation = "slideOutLeft";
    }

    function swipedRight(deed) {
      deed.animation = "slideOutRight";
      // make request
      // /deeds/:id/requests
    }

    vm.favourite = (deed) => {
    Deed.favourite({ id: deed._id }, data => {
      console.log(data);
    });
  };

}
