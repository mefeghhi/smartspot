angular.module('smartSpot')
	.directive('footer', function() {
		return {
			restrict: 'E',
			templateUrl: 'directives/footer/footer.html',
			replace: true,
			scope: {},
			link: function($scope, element, attribute) {
			}
		};
	});