//do this because we want to affect the httpProvider
angular
  .module("goodVibes")
  //config has to be used because it is loaded right at the start
  .config(setUpInterceptor);

setUpInterceptor.$inject = ["$httpProvider"];

function setUpInterceptor($httpProvider){
  return $httpProvider.interceptors.push("AuthInterceptor");
}
