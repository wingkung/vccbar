/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('MoreCtrl', function($scope, socket){
    $scope.agents = [];

    $scope.refresh = function(){
        socket.emit('agents_info', {});
    };

    $scope.$on('agents_info', function(event, data){
        $scope.agents = data;
    });
});