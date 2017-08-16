
appServices.factory('AuthService', ['$cookies', '$q', '$http', 'URL_WS', '$timeout',
  function($cookies, $q, $http, URL_WS, $timeout){
    return {
      isAuthenticated: function() {
        return localStorage.token ? localStorage.user : false;
      },
      makeLogin: function(user_signin, success, error) {
        $http.get(
            URL_WS + 'users?user_name='+ user_signin.login +'&password=' + user_signin.password
        ).then(success, error);
      },
      makeLogout: function(afterLogout) {
        delete sessionStorage;
        delete localStorage.token;
        delete localStorage.user;

        $timeout(afterLogout, 200);
      },
      passwordReset: function(user_id, new_password) {
        var data = {
          password: new_password
        };

        $http.post(URL_WS + 'users/'+ user_id, data).then(success, error);
      }
    };
  }]);