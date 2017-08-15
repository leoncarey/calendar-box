
/*
 * ApplicationCtrl
 * */
appControllers.controller('ApplicationCtrl',
  function($scope, $rootScope, $location, $timeout) {

    $rootScope.currentUser = false;

    // $timeout(function () {
      $rootScope.appLoading = false;
    // });

  });