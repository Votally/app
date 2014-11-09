angular.module('App.Receivers', [])

.controller('ReceiversController', function($scope, $location, ReceiversFactory, ServerRequests, ServerRoutes) {

  //delete this part when server working
  var tempReceivers = [
      {name: 'Teresa', userId: 12345},
      {name: 'Satoko', userId: 12345},
      {name: 'Rich', userId: 12345},
      {name: 'bace', userId: 12345},
      {name: 'Bogut', userId: 12345},
    ];

  $scope.cancelSend = function(){
    //empty the content storage in the ReceiversFactory
    ReceiversFactory.resetContentFromHome();
    $location.path('/'); 
  }

  //when send button is clicked on receivers page,
  //send current selected receivers (as an array) to Receivers Factory
  $scope.setReceivers = function(){
    console.log('setReceivers is called')
    //send receivers to ReceiversFactory, get back content & receivers in object
    var sendContent = ReceiversFactory.addReceivers($scope.selectedReceivers);
    //make post request with content and receivers object
    ServerRequests.post(sendContent, ServerRoutes.postContent);
    //empty the content storage in the ReceiversFactory
    ReceiversFactory.resetContentFromHome();
    //route back to the home page
    $location.path('/'); 
  };

  //all receivers to be listed in the receivers page
  $scope.allReceivers = tempReceivers;
  //$scope.allReceivers = serverRequestFactory.get(serverRoutesFactory.getReceivers);
    
  //a place to store a list of receivers that have been selected in the view
  $scope.selectedReceivers = tempReceivers;

  
});