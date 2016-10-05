angular
  .module("goodVibes")
  .controller("RequestsShowCtrl", RequestsShowCtrl);

RequestsShowCtrl.$inject = ["Request", "$stateParams", "$state"];
function RequestsShowCtrl(Request, $stateParams, $state){
  const vm               = this;

  vm.reply               = reply;

  Request.get($stateParams, data => {
    vm.request           = data.request;
  });

  function reply(){
    Request
      .reply({ id: vm.request._id }, { message: vm.message })
      .$promise
      .then(data => {
        vm.request       = data.request;
        vm.message       = null;
      })
      .catch(console.log);
  }
}
