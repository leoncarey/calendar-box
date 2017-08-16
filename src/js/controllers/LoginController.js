
/*
 * LoginCtrl
 * */
appControllers.controller('LoginCtrl', ['AuthService', '$scope', '$rootScope', '$location',
  function(AuthService, $scope, $rootScope, $location) {

    $scope.loading_form = false;
    $scope.errors = [];

    $scope.user_signin = {
      login: 'alce',
      password: '12345'
    };

    $scope.makeLogin = function () {
      
    }

  }]);