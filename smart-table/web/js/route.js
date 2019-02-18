// Configure Angular route

//module = angular.module("myApp", ['ngRoute']);

JXSRC.module.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/table/:template', {
                templateUrl: 'template/view.html',
                controller: 'Ctrl'
            }).
            when('/charts/:template', {
              templateUrl: 'template/view.html',
              controller: 'Ctrl'
            }).
            when('/help/:template', {
              templateUrl: 'template/view.html',
              controller: 'Ctrl'
            }).
            when('/', {
              templateUrl: 'template/view.html',
              controller: 'Ctrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
