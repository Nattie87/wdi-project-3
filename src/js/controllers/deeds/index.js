angular
  .module("goodVibes")
  .controller("DeedIndexCtrl", DeedIndexCtrl);

DeedIndexCtrl.$inject = ["Deed", "$stateParams", "CurrentUserService", "Request"];
function DeedIndexCtrl(Deed, $stateParams, CurrentUserService, Request){
  const vm            = this;
  vm.user             = CurrentUserService.getUser();
  vm.swipedLeft       = swipedLeft;
  vm.swipedRight      = swipedRight;
  vm.submitMessage    = submitMessage;

  Deed
    .query($stateParams)
    .$promise
    .then(data => {
      vm.deeds = data.deeds;
    });

    function swipedLeft(deed) {
      deed.animation  = "slideOutLeft";
    }

    function swipedRight(deed) {
      deed.animation  = "slideOutRight";
      vm.deed = deed;
      $('#deedModal').modal('show');
    }

    function submitMessage(){
      Request.save({
        deed: vm.deed._id,
        messages: [{
          body: vm.message.body
        }]
      })
      .$promise
      .then(data => {
        $('#deedModal').modal('hide');
      })
      .catch(console.log);
    }

}
