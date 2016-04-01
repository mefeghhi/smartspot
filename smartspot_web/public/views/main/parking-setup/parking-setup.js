angular.module('smartSpot')
	.controller('ParkingSetupCtrl', function($scope, $rootScope, Parking, $state, $stateParams, ServerPath, $http, store) {
		$rootScope.confirm_logged_in();
		$rootScope.title = $stateParams.title;
		Parking.get({id: $stateParams.id}, function(response) {
			$scope.parking = response;
			$scope.main_link = ServerPath + '/parkings/' + $scope.parking.id + '/download_main_driver?token=' + store.get('smartspot_token');
			$scope.test_link = ServerPath + '/parkings/' + $scope.parking.id + '/download_test_driver?token=' + store.get('smartspot_token');
		});
	});