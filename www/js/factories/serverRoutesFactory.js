angular.module('App.ServerRoutes', [])

.factory('ServerRoutes', function(){
  //return an object of the routes
  return {
    sendContent: 'someRoute',
    getPending: 'someRoute',
    sendVote: 'someRoute',
    getResults: 'someRoute',
    getReceivers: 'someRoute',
    postContent: 'someRoute'
  };
});