angular.module('smartSpot')
	.controller('MainCtrl', function($scope, $rootScope, jwtHelper, store, $state) {
		$.material.init();
		$rootScope.logged_in = false;
		$rootScope.username = '';

		$rootScope.logout = function() {
			store.remove('smartspot_token');
			$rootScope.update_user();
			$state.go('main.login');
		}
		$rootScope.update_user = function() {
			token = store.get('smartspot_token');
			if (token) {
				$rootScope.logged_in = true;
				$rootScope.username = jwtHelper.decodeToken(token)['username'];
			} else {
				$rootScope.logged_in = false;
				$rootScope.username = '';
			}
		};
		$rootScope.confirm_logged_in = function() {
			if(!$rootScope.logged_in) {
				$state.go('main.login');
			}
		}
		$rootScope.update_user();
	});