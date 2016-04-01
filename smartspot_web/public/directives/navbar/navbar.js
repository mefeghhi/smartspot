angular.module('smartSpot')
	.directive('navbar', function($rootScope, $state) {
		return {
			restrict: 'E',
			templateUrl: 'directives/navbar/navbar.html',
			replace: true,
			scope: {
				title: '='
			},
			link: function($scope, element, attribute) {
			}
		};
	});