angular.module('smartSpot')
	.controller('MobileCtrl', function($scope, $rootScope, Parking, $timeout) {
		$.material.init();
		$scope.selected_parking_index = 0;
		$scope.refresh_data = function() {
			Parking.query(function(response) {
				$scope.parkings = response;
				$timeout($scope.refresh_data, 1000);
			});
			if ($scope.mode == 'item') {
				Parking.get({id: $scope.parking.id}, function(response) {
					$scope.parking = response;
				});
			}
		}
		$scope.refresh_data();
		$scope.parking = {};
		$scope.mode = 'list';
		$scope.show_parking = function(i) {
			$scope.selected_parking_index = i;
			$scope.parking = $scope.parkings[i];
			Parking.get({id: $scope.parking.id}, function(response) {
				$scope.parking = response;
				$scope.mode = 'item';
			});
		};
		$scope.back_to_list = function() {
			$scope.mode = 'list';
		}

		
	});