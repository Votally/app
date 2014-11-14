angular.module('App.Pending', [])
.controller('PendingController', function ($scope, $window, $location, ServerRequests, ServerRoutes, Auth) {
	
  //======================== helper functions ==============================

  var showContent = function(currentContent){
  	console.log('setting up to show the content 1...');
  	contentId = currentContent.contentId;
  	$scope.topic = currentContent.topic;
  	$scope.sender = currentContent.userName;
  	$scope.pictureUrl = currentContent.picture;
  };

  var checkPending = function(){
  	console.log('checking the pending...');
	  //if there are no pending, redirect back to home
		if(!pendingList || pendingList.length === 0){
			//redirect to home swipe back??
			$location.path('/');
		}else{
			//show the 1st pending item
			showContent(pendingList[0]);
		}
  }

	//======================== initialize ==============================

	// //if not loggedIn, send the user to logIn
	// if(!Auth.loggedIn()){
	// 	$location.path('/logIn');
	// }
	var contentId;
	var pendingList;
	//get the userId info from local storage and set it as a local variable
	var userId = $window.localStorage.getItem('userId');

	//get all the pendings for the user
	var getPending = function(){

		ServerRequests.get(userId, ServerRoutes.getPending)
		  .then(function(response){
				//  response looks like...
				// {
				// 	pendingContents: [{
				// 		contentId: number,
				// 		topic: string,
				// 		picture: undefined(url?)
				// 		userId: number,
				// 		userName: string
				// 	}, {}, ...]
				// } 
		  	pendingList = response.pendingContents;
		  	//    pendingList = [
		  	//    	{ contentId: 1,
		  	//    	  topic: 'This owl beanie for Rich?',
		  	//    	  picture: 'http://assets.inhabitots.com/wp-content/uploads/2013/11/adorable-cozy-owl-hat-537x365.jpg',
		  	//    	  userId: 100,
		  	//    	  userName: 'Teresa' },
		  	//    	{ contentId: 2,
		  	//    	  topic: 'for lunch?',
		  	//    	  picture: 'http://www.scmp.com/sites/default/files/styles/980w/public/2013/07/31/turtle-burger-l.jpg?itok=SfyO-6l_',
		  	//    	  userId: 200,
		  	//    	  userName: 'Bace' },
		  	//    	{ contentId: 3,
		  	//    	  topic: 'still grumpy?',
		  	//    	  picture: 'http://i.imgur.com/Cxagv.jpg',
		  	//    	  userId: 300,
		  	//    	  userName: 'Rich' },
		  	//    	{ contentId: 4,
		  	//    	  topic: 'wanna play?',
		  	//    	  picture: 'http://icons.iconarchive.com/icons/yellowicon/game-stars/256/Mario-icon.png',
		  	//    	  userId: 400,
		  	//    	  userName: 'Satoko' },
		  	//    	{ contentId: 5,
		  	//    	  topic: 'mall?',
		  	//    	  picture: 'http://www.thespicehut.com/Assets/bubble-tea-bellingham.jpg',
		  	//    	  userId: 400,
		  	//    	  userName: 'Satoko' }
		  	   	  
		  	//    ];
			  checkPending();

		  })
		  //if there is an error getting the pendings, console an error.
		  .catch(function(error){
		  	console.error(error);
		  });
    
	};
	getPending();

	//======================== click function ==============================

  $scope.sendVote = function(vote){
  	var result = {
  		'userId': userId,
  		'contentId': contentId,
  		'vote': vote
  	};

  	ServerRequests.post(result, ServerRoutes.sendVote)
  	  .then(function(){
  	  	pendingList.shift();
  	  	checkPending();
  	  })
  	  //if there is an error on voting, console an error.
  	  .catch(function(error){
  	  	console.error(error);
  	  });
  };

});

