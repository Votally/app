angular.module('App.Login', [])
	.controller('LoginController', function ($scope, $window, $location, Auth) {
		$scope.usernameInput;
		$scope.passwordInput;

		$scope.logIn = function(username, password){
			// Auth.login(username, password)
			//   .then(function(response){
			//   	//after logging in, route to home
					console.log('login as ', username, password);
          $location.path('/');
			//   })
			//   .catch(function(error){
			//   	console.error(error);
			//   });
		}

		$scope.signUp = function(){
			$location.path('/signup');
		}
			
	});