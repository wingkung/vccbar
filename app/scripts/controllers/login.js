/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('LoginCtrl', function($scope){
    $scope.login = function(){
        $scope.$parent.$parent.agent.logined = true;
    }
});