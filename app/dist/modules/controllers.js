
appControllers.controller('ApplicationCtrl',
  function($scope, $rootScope, $location, $timeout) {

    $rootScope.currentUser = false;

      $rootScope.appLoading = false;

  });

appControllers.controller('DashboardCtrl', ['$scope', '$rootScope', '$location',
  function($scope, $rootScope, $location) {

  }]);

appControllers.controller('LoginCtrl', ['AuthService', '$scope', '$rootScope', '$location',
  function(AuthService, $scope, $rootScope, $location) {



  }]);