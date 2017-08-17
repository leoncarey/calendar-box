
/*
 * ApplicationCtrl
 * */
appControllers.controller('ApplicationCtrl',
  function($scope, $rootScope, $location, $timeout, AuthService) {

    // App refresh
    $rootScope.refreshApp = function () {
      $rootScope.currentUser = JSON.parse( AuthService.isAuthenticated() );

      console.log($rootScope.currentUser);
    };

    // Make logout app
    $scope.makeLogout = function () {
      $rootScope.appLoading = true;

      AuthService.makeLogout(function () {
        $rootScope.refreshApp();
        $location.path('/login');
        $rootScope.appLoading = false;
      });
    };

    // Refresh when load app first time
    $rootScope.refreshApp();

  });