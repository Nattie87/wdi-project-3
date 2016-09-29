angular
  .module("goodVibes")
  .factory("AuthInterceptor", AuthInterceptor);

AuthInterceptor.$inject = ["API", "TokenService"];
function AuthInterceptor(API, TokenService) {
  return {
    request(config){
      //send token as a header
      const token = TokenService.getToken();
      if(config.url.indexOf(API) === 0 && token){
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    response(res) {
      console.log(res);
      //intercepted response from an http request
      if(res.config.url.indexOf(API) === 0 && res.data.token) {
          TokenService.setToken(res.data.token);
      }
      return res;
    }
  };
}
