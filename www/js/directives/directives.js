angular.module('App.Directives', [])
  .directive('setImage', function(){
    return {
      restrict: 'A',
      scope: {
        image: '='
      },
      link: function(scope, element, attributes){
        scope.$watch('image', function(newVal, oldVal){
          element.attr("src", scope.image);
        })
      }
    }
  })

  .directive('compareInput', function(){
    return {
      require: 'ngModel',
      scope: {
        otherModelValue : '=compareInput'
      },
      link: function(scope, element, attributes, ngModel){
        ngModel.$validators.compareInput = function(modelValue){
          return modelValue == scope.otherModelValue;    
        }
        scope.$watch('otherModelValue', function(){
          ngModel.$validate();
        })
      }
    }
  });
