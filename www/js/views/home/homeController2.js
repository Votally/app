angular.module('App.Home', [])

//Retrieves and overwrites the default regexp that is used to whitelist safe urls during img sanitization
//Normalizes any url about to be used in img(src) and returns an absolute path
.config(function($compileProvider) {
  $compileProvider
    .imgSrcSanitizationWhitelist(/^\s*(https?|blob|cdvfile|content|ftp|mailto|file|tel):|data:image\//);
})

.controller('HomeController', function($scope, $location, $window, ReceiversFactory, Auth) {
  //TODO Check if logged in and route accordingly

  //Holds the pic/text content that will be sent
  $scope.content = {
    topic: '',
    picture: 'some picture data',
    userId: 0
  }

  $scope.addText = function(newText){
    $scope.content.topic = newText;
  }

  //sends to new routes when home page is swiped
  $scope.swiping = function(direction){
    if (direction === 'left'){
      $location.path('/results');
    }
    if (direction === 'right'){
      $location.path('/pending');
    }
  }

  //sends to receivers when Send button is pushed
  $scope.send = function(){
    //sends content to be stored in ReceiversFactory
    ReceiversFactory.contentFromHome($scope.content);

    //sends user to receiver route
    $location.path('/receivers');

  }

  //calls the getPicture function from the factory allowing the user to upload/take pictures
  $scope.getPhoto = function() {
    Camera.getPicture()
      .then(function(imageURI) {
        if (imageURI.substring(0,21)=="content://com.android") {
          var photo_split=imageURI.split("%3A");
          imageURI="content://media/external/images/media/"+photo_split[1];
        };
        window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
            var image = document.getElementById('myImage');
            image.src = fileEntry.nativeURL;
          });
      }, function(error) {
        alert(error); 
      }, {
        quality: 75,
        targetWidth: 100,
        targetHeight: 100,
        saveToPhotoAlbum: false,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
      });
  }
});

