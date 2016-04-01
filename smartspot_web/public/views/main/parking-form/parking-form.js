angular.module('smartSpot')
	.controller('ParkingFormCtrl', function($scope, $rootScope, Parking, $state, $stateParams) {
		$rootScope.confirm_logged_in();
		$scope.mode = $stateParams.mode;
		$rootScope.title = $stateParams.title;
		$scope.parking = {
			name: "",
			address: "",
			description: "",
			spots: [{
				label: "1"
			},{
				label: "2"
			}]
		};
		$scope.number_of_sensors = 2;

		if ($scope.mode == 'edit') {
			Parking.get({id: $stateParams.id}, function(response) {
				$scope.parking = response;
				$scope.number_of_sensors = $scope.parking.spots.length;
			});
		}
		$scope.boolToStr = function(arg) {return arg ? 'Busy' : 'Free'};

		$scope.number_of_sensors_changed = function() {
			$scope.parking.spots = [];
			for (var i = 0; i < $scope.number_of_sensors; i++) {
				var spot = {
					label: (i + 1).toString()
				};
				$scope.parking.spots.push(spot);
			}
		};
		$scope.submit_new_parking = function() {
			var p = new Parking($scope.parking);
			p.$save(function (response, headers) {
				if (response.status == 'error') {
					alert(response.message);
				} else {
					alert("success");
					$state.go('main.control_panel');
				}
			}, function (error) {
				alert("Error in server. Please look at the console for more details.");
				console.log(error);
			});
		};
		$scope.submit_edited_parking = function() {
			$scope.parking.$update(function (response, headers) {
				if (response.status == 'error') {
					alert(response.message);
				} else {
					alert("success");
					$state.go('main.control_panel');
				}
			}, function (error) {
				alert("Error in server. Please look at the console for more details.");
				console.log(error);
			});
		};
		$scope.delete_parking = function() {
			$scope.parking.$delete(function (response, headers) {
				if (response.status == 'error') {
					alert(response.message);
				} else {
					alert("success");
					$state.go('main.control_panel');
				}
			}, function (error) {
				alert("Error in server. Please look at the console for more details.");
				console.log(error);
			});
		};
		$scope.cancel = function() {
			$state.go('main.control_panel');
		};
	});