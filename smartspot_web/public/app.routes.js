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
                params: {
                    title: 'Login'
                },
                controller: 'AuthenticationCtrl',
                templateUrl: 'views/main/authentication/authentication.html'
            })
            .state('main.control_panel', {
                url: '/control_panel',
                controller: 'ControlPanelCtrl',
                params: {
                    title: 'Control Panel'
                },
                templateUrl: 'views/main/control-panel/control-panel.html'
            })
            .state('main.new_parking', {
                url: '/parkings/new',
                params: {
                    mode: 'new',
                    title: 'Create New Parking'
                },
                controller: 'ParkingFormCtrl',
                templateUrl: 'views/main/parking-form/parking-form.html'
            })
            .state('main.edit_parking', {
                url: '/parkings/:id/edit',
                params: {
                    mode: 'edit',
                    title: 'Edit Parking'
                },
                controller: 'ParkingFormCtrl',
                templateUrl: 'views/main/parking-form/parking-form.html'
            })
            .state('main.install_parking', {
                url: '/parkings/:id/install',
                params: {
                    title: 'Parking Setup'
                },
                controller: 'ParkingSetupCtrl',
                templateUrl: 'views/main/parking-setup/parking-setup.html'
            })
             .state('mobile', {
                url: '/mobile',
                controller: 'MobileCtrl',
                templateUrl: 'views/mobile/mobile.html'
            })
    });