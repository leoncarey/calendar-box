
appDirectives.directive('clickActiveElement', function(){
  return function(scope, elem, attrs) {

    angular.element(elem).on('click', function() {
      if ( angular.element(this).hasClass('active') ) {
        angular.element(this).removeClass('active');
      } else {
        angular.element(this).addClass('active');
      }
    });

  };
});