angular.module('smartSpot')
    .config(function($locationProvider, $stateProvider,$urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                abstract: true,
                controller: 'MainCtrl',
                templateUrl: 'views/main/main.html'
            })
            .state('main.login', {
                url: '/login',
                controller: 'AuthenticationCtrl',
                templateUrl: 'views/main/authentication/authentication.html'
            });
    });