
;(function () {

  "use strict";

  /*
   * App initialized
   * */
  var app = angular.module('calendarBoxApp', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngStorage',
    'appControllers',
    'appDirectives',
    'appServices'
  ]);


  /*
   * Urls
   * */
  app.value('BASE_URL', 'http://localhost:8000/app/');
  app.value('URL_WS', 'http://localhost:3330/');


  app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $qProvider) {
    /*
     * Routes
     * */
    $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl',
          controllerAs: 'auth',
          authenticate: true
        })

        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'auth',
          authenticate: true
        })

        .state('password-reset', {
          url: '/password-reset',
          templateUrl: 'views/password-reset.html',
          controller: 'PasswordResetCtrl',
          controllerAs: 'passreset',
          authenticate: false
        })

        .state('logout', {
          url: '/logout',
          templateUrl: 'views/logout.html',
          controller: 'LogoutCtrl',
          authenticate: true
        });


    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true).hashPrefix('!');

    $qProvider.errorOnUnhandledRejections(false);

    /*
     * Auth config
     * */
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
      return {
        'request': function (config) {
          if ($localStorage.token) {
            config.headers.Authorization  = $localStorage.token;
            $location.path('/');
          }
          else {
            $location.path('/login');
          }
          return config;
        },
        'responseError': function(response) {
          console.log('error', response);
          if(response.status === 401 || response.status === 403) {
            $location.path('/login');
          }
          return $q.reject(response);
        }
      };
    }]);

  });

})();