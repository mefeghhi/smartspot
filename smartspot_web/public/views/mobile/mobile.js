angular.module('smartSpot')
	.controller('MobileCtrl', function($scope, $rootScope, Parking, $timeout) {
		$.material.init();
		$scope.selected_parking_index = 0;
		$scope.markers = [];
		$scope.refresh_data = function() {
			Parking.query(function(response) {
				$scope.parkings = response;
				$scope.create_markers();
				$timeout($scope.refresh_data, 3000);
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
		$scope.show_map = function() {
			$scope.mode = 'map';
		}
		$scope.map = { center: { latitude: 53.5237529, longitude: -113.5241747 }, zoom: 14 };
		$scope.create_markers = function() {
			$scope.markers = [];
			for (var i = 0; i < $scope.parkings.length; i++) {
				var parking = $scope.parkings[i];
				var x = i.toString();
				$scope.markers.push({
					id: i,
					coords: {
						latitude: Number(parking.latitude),
						longitude: Number(parking.longitude)
					},
					options: {
						labelContent: parking.name,
            			labelClass: "marker-labels"
					},
					events: {
						click: function (e) {
							$scope.show_parking(e.model.idKey);
						}
					}
				});
			}
		}
	});