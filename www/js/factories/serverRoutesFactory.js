angular.module('App.ServerRoutes', [])

.factory('ServerRoutes', function(){
  //return an object of the routes
  return {
    sendContent: 'receivers/sendContent',
    getPending: './pending/getPending',
    sendVote: './pending/sendVote',
    getResults: './results/getResults',
    getReceivers: 'receivers/getContacts',
    postContent: 'receivers/sendContent'
  };
});