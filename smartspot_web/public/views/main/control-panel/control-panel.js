angular.module('smartSpot')
	.controller('ControlPanelCtrl', function($scope, $rootScope, Parking, $stateParams) {
		$rootScope.confirm_logged_in();
		$rootScope.title = $stateParams.title;
		Parking.query(function(response) {
			$scope.parkings = response;
		});
	});