angular.module('smartSpot')
	.factory('Parking', function ($resource, ServerPath) {
		return $resource(ServerPath + '/parkings/:id', {id: '@id'}, {
			'update': {'method': 'PATCH'},
			'delete': {'method': 'DELETE'}
		});
	});