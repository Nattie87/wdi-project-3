angular
  .module("goodVibes")
  .controller("RequestsIndexCtrl", RequestsIndexCtrl);

RequestsIndexCtrl.$inject = ["Request", "$stateParams", "$state"];
function RequestsIndexCtrl(Request, $stateParams, $state){
  const vm                = this;

  Request.query(data => {
    vm.requests = data.requests;
    vm.requests           = data.requests;
  });
}
