angular
  .module("goodVibes")
  .factory("Request", requestFactory);

requestFactory.$inject = ["$resource", "API"];
function requestFactory($resource, API){
  return $resource(`${API}/requests/:id`,
    { id: '@_id'}
  );
}
