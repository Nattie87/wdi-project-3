angular
  .module("goodVibes")
  .factory("User", userFactory);

userFactory.$inject =["API", "$resource"];
function userFactory(API, $resource){
  return $resource(`${API}/users/:id`, { id: "@_id"}, {
    'query': { method: "GET", isArray: false },
    //just adding another custom method to user factory and this case give it specific url
    //these will overwrite url in resource on top
    'register': { method: "POST", url: `${API}/register`},
    'login'   : { method: "POST", url: `${API}/login`}
  });
}
