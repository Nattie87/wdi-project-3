angular
.module("goodVibes")
.service("TokenService", TokenService);


//service is like an actual constructor function
//when injected it's newed, instantiated as new
TokenService.$inject = ["$window", "jwtHelper"];
function TokenService($window, jwtHelper){
  const self = this;

  self.setToken = setToken;
  self.getToken = getToken;
  self.decodeToken = decodeToken;
  self.clearToken = clearToken;

  function setToken(token) {
    return $window.localStorage.setItem("auth-token", token);
  }

  function getToken(){
    return $window.localStorage.getItem("auth-token");
  }

  function decodeToken(){
    const token = self.getToken();
    return token ? jwtHelper.decodeToken(token) : null;
  }

  function clearToken(){
    return $window.localStorage.removeItem("auth-token");
  }
}
