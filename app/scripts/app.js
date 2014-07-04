var app = angular.module('vccbarApp', []);

app.directive('btn', function(){
    return {
        restrict: 'C',
        scope: {
            extend: "="
        },
        link: function(scope, element){
            element.on('mouseenter', function(){
                element.addClass('extend');
            });
            element.on('mouseleave', function(){
                element.removeClass('extend');
            });
        }
    }
});



