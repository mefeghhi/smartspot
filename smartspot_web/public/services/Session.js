angular.module('smartSpot')
	.factory('Session', function ($resource, ServerPath) {
		return $resource(ServerPath + '/sessions/:id', {id: '@id'}, {
			'update': {'method': 'PATCH'}
		});
	});