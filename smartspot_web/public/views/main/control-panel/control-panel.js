angular.module('smartSpot')
	.controller('ControlPanelCtrl', function($scope, $rootScope, Parking) {
		$rootScope.confirm_logged_in();
		Parking.query(function(response) {
			$scope.parkings = response;
		});
	});