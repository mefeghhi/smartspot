angular.module('smartSpot')
	.controller('AuthenticationCtrl', function($scope, $rootScope, store, Session, $state, $stateParams) {
		$scope.user = {};
		$rootScope.title = $stateParams.title;
		$scope.login_submit = function() {
			var s = new Session($scope.user);
			s.$save(function (response, headers) {
				if (response.status == 'error') {
					alert(response.message);
				} else {
					store.set('smartspot_token', response.token);
					$rootScope.update_user();
					$state.go('main.control_panel');
				}
			}, function (error) {
				alert("Error in server. Please look at the console for more details.");
				console.log(error);
			});
		};
	});