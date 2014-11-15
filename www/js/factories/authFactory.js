angular.module('App.Auth', [])

.factory('Auth', function ($http, $location, $window) {

  //===================HELPER FUNCTION========================

  var auth = function(username, password, route){
    //make userInfo object with username and password and send it to the passed in route
    var userInfo = {
      username: username,
      password: password
    };
    return $http({
      method: 'POST',
      url: route,
      data: userInfo
    })
    .then(function (response) {
      //expect respose to be an object with userId and token info.
      //store loggedIn boolean, userId and token in local storage
      $window.localStorage.setItem('loggedIn', true);
      $window.localStorage.setItem('userId', response.data.userId); 
      $window.localStorage.setItem('token', response.data.token);
      return response.data;
    })
    //if error in the process, console it 
    .catch(function(error){
      console.error(error);
    });
  };
  
  //===================SERVICE FUNCTION========================
  var login = function (username, password) {
    return auth(username, password, '/user/login');
  };

  var signup = function (username, password) {
    return auth(username, password, '/user/signup');
  };

  var loggedIn = function () {
    return !!$window.localStorage.getItem('loggedIn');
  };

  var logout = function () {
    //When logout button is clicked, set local storage object to be loggedIn = false and userId = undefined 
    $window.localStorage.setItem('loggedIn', false);
    $window.localStorage.setItem('userId', undefined);
    $location.path('/login');
  };


  return {
    login: login,
    signup: signup,
    loggedIn: loggedIn,
    logout: logout
  };
});
