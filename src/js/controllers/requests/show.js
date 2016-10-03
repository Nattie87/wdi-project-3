angular
  .module("goodVibes")
  .controller("RequestsShowCtrl", RequestsShowCtrl);

RequestsShowCtrl.$inject = ["Request", "$stateParams", "$state"];
function RequestsShowCtrl(Request, $stateParams, $state){
  const vm = this;

  Request.get($stateParams, data => {
    vm.request = data.request;
  });
}
