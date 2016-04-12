var app = angular.module('smartSpot', [
	'ui.router',
	'ngResource',
	'angular-storage',
	'angular-jwt',
	'uiGmapgoogle-maps'
]);
app.value('ServerPath', 'http://localhost:3000/api');