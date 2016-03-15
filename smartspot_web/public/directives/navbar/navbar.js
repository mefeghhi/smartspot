angular.module('smartSpot')
	.directive('navbar', function($rootScope, $state) {
		return {
			restrict: 'E',
			templateUrl: 'directives/navbar/navbar.html',
			replace: true,
			scope: {},
			link: function($scope, element, attribute) {
			}
		};
	});