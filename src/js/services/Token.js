
/*
 * Token
 */
appServices.factory("Token", ['$cookies', '$localStorage', function($cookies, $localStorage){
  var token = $cookies.get('token');
  if(token === null || !token) token = localStorage.getItem('token');
  return {
    token: token,
    logado: true,
    logout: function(){

      $cookies.remove('token');
      sessionStorage.removeItem('token');
      delete $localStorage.token;
      delete $localStorage.user;

    }
  };
}]);