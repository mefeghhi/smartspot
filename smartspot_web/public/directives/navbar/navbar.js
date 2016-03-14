angular.module('smartSpot')
	.directive('navbar', function($rootScope, $state) {
		return {
			restrict: 'E',
			templateUrl: 'directives/navbar/navbar.html',
			replace: true,
			scope: {},
			link: function($scope, element, attribute) {
				$scope.is_logged_in = function() {
					return $rootScope.logged_in;
				}
				$scope.logout = function() {
					store.remove('poll_token');
					$rootScope.update_user();
					$state.go('main.polls')
				}
			}
		};
	})