angular
  .module("goodVibes")
  .factory("Deed", deedFactory);

  deedFactory.$inject = ["$resource", "API"];
  function deedFactory($resource, API){
    return $resource(`${API}/deeds/:id`,
      { id: '@_id' },
      {
        'get':    { method: 'GET' },
        'save':   { method: 'POST' },
        'remove': { method: 'DELETE' },
        'delete': { method: 'DELETE' },
        'query':    { method:'GET', isArray: false },
        'update':   { method: 'PUT' }
      }
    );
  }
