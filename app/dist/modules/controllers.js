
appControllers.controller('ApplicationCtrl',
  function($scope, $rootScope, $location, $timeout, AuthService) {

    $rootScope.refreshApp = function () {
      $rootScope.currentUser = JSON.parse( AuthService.isAuthenticated() );

      console.log($rootScope.currentUser);
    };

    $scope.makeLogout = function () {
      $rootScope.appLoading = true;

      AuthService.makeLogout(function () {
        $rootScope.refreshApp();
        $location.path('/login');
        $rootScope.appLoading = false;
      });
    };

    $rootScope.refreshApp();

  });

appControllers.controller('DashboardCtrl', ['$scope', '$rootScope', '$location',
  function($scope, $rootScope, $location) {

  }]);

appControllers.controller('LoginCtrl', ['AuthService', '$scope', '$rootScope', '$location',
  function(AuthService, $scope, $rootScope, $location) {

    $scope.loading_form = false;
    $scope.errors = [];

    $scope.user_signin = {
      login: 'alce',
      password: '12345'
    };

    $scope.submitLogin = function () {
      $scope.loading_form = true;
      $scope.errors = [];

      if($scope.user_signin.login == '' || $scope.user_signin.password == '') {
        $scope.emptyFields();
      } else {
        AuthService.makeLogin($scope.user_signin,
            function(result) {

              if(result.data.length != 0) {
                $scope.loginIsOK(result);
              } else {
                $scope.errors.push('Usuário não encontrado.');
              }

            },
            function(error) {
              console.log(error);
              $scope.errors.push('Erro desconhecido.');
            }
        );

        $scope.loading_form = false;
      }
    };

    $scope.loginIsOK = function (result) {
      var user_returned = result.data[0];

      localStorage.token = user_returned.token;
      localStorage.user = JSON.stringify({
        user_name:  user_returned.user_name,
        name:       user_returned.name,
        email:      user_returned.email
      });

      $rootScope.refreshApp();
      $location.path('/');
    };

    $scope.emptyFields = function () {
      $scope.errors.push('Por favor, preencha os campos corretamente.');
      $scope.loading_form = false;
    };

  }]);