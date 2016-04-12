angular.module('smartSpot')
	.controller('ParkingFormCtrl', function(uiGmapGoogleMapApi, $scope, $rootScope, Parking, $state, $stateParams) {
		$rootScope.confirm_logged_in();
		$scope.mode = $stateParams.mode;
		$rootScope.title = $stateParams.title;
		$scope.parking = {
			name: "",
			address: "",
			description: "",
			latitude: "53.5237529",
			longitude: "-113.5241747",
			spots: [{
				label: "1"
			},{
				label: "2"
			}]
		};
		$scope.number_of_sensors = 2;
		$scope.map = { center: { latitude: 53.5237529, longitude: -113.5241747 }, zoom: 14 };
		$scope.marker = {
			id: 0,
			coords: {
				latitude: 53.5237529,
				longitude: -113.5241747
			},
			options: { draggable: true },
			events: {
				dragend: function (marker, eventName, args) {
					var lat = marker.getPosition().lat();
					var lon = marker.getPosition().lng();
					$scope.parking.latitude = lat.toString();
					$scope.parking.longitude = lon.toString();
					$scope.marker.options = {
						draggable: true,
						labelContent: "",
						labelAnchor: "100 0",
						labelClass: "marker-labels"
					};
				}
			}
		};

		if ($scope.mode == 'edit') {
			Parking.get({id: $stateParams.id}, function(response) {
				$scope.parking = response;
				$scope.marker.coords.latitude = Number($scope.parking.latitude);
				$scope.marker.coords.longitude = Number($scope.parking.longitude);
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