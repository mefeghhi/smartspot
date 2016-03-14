angular.module('smartSpot')
	.factory('Session', function ($resource, RESTApiPath) {
		return $resource(RESTApiPath + '/sessions/:id', {id: '@id'}, {
			'update': {'method': 'PATCH'}
		});
	});