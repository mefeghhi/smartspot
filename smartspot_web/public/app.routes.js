angular.module('smartSpot')
    .config(function($locationProvider, $stateProvider, $httpProvider, jwtInterceptorProvider, $urlRouterProvider) {
        
        jwtInterceptorProvider.tokenGetter = function(store) {
            return store.get('smartspot_token');
        };
        $httpProvider.interceptors.push('jwtInterceptor');

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/control_panel');
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
            })
            .state('main.control_panel', {
                url: '/control_panel',
                controller: 'ControlPanelCtrl',
                templateUrl: 'views/main/control-panel/control-panel.html'
            })
            .state('main.new_parking', {
                url: '/parkings/new',
                params: {
                    mode: 'new'
                },
                controller: 'ParkingFormCtrl',
                templateUrl: 'views/main/parking-form/parking-form.html'
            })
            .state('main.edit_parking', {
                url: '/parkings/:id/edit',
                params: {
                    mode: 'edit'
                },
                controller: 'ParkingFormCtrl',
                templateUrl: 'views/main/parking-form/parking-form.html'
            })
    });