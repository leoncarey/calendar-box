
/*
 * AuthService
 */
appServices.factory('AuthService', ['$cookies', '$q', '$http', 'URL_WS', 'Token', '$localStorage',
  function($cookies, $q, $http, URL_WS, Token, $localStorage){
    return {
      isAuthenticated: function() {
        return Token.logado;
      },
      makeLogin: function(login, password) {
        $http.post(URL_WS + '/users', data).then(function(result) {

              if(result.data) {
                $localStorage.token = result.data.token;
                $localStorage.user = {
                  login: data.login,

                  profile: {
                    name: 'Usuário',
                    email: 'usuario@gmail.com',
                    phone: '(51) 9 9270-9969',
                    avatar: 'user_default.png'
                  }
                };
                $cookies.token = result.data.token;
                Token.token = result.data.token;
                Token.logado = true;
              }

            },
            function() {
              deferred.reject("Erro desconhecido");
            });

        return deferred.promise;
      },
      makeLogout: function(login, password, callback) {

      },
      passwordReset: function(email) {
        var deferred = $q.defer();
        var data = {email: email};

        $http.post(URL_HTTP + '/password-reset', data).then(function(result){
              if(result.data.status) {
                deferred.resolve();
                localStorage.setItem('token', result.data.token);
                $cookies.put('token', result.data.token);
              }else{
                deferred.reject(result.data.reason);
              }
            },
            function(){
              deferred.reject("Erro desconhecido");
            });
        return deferred.promise;
      }
    };
  }]);