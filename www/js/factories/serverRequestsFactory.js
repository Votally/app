angular.module('App.ServerRequests', [])

.factory('ServerRequests', function ($http) {
  //make get request to the route
  var get = function (data, route) {
    return $http({
      method: 'GET',
      url: route,
      data: data
    })
    .then(function (response) {
      return response.data;
    });
  };

  //make post request to the route with given data
  var post = function (data, route) {
    console.log(data);
    return $http({
      method: 'POST',
      url: route,
      data: data
    })
    .then(function (response) {
      return response.data;
    });
  };

  return {
    get: get,
    post: post
  };
});
