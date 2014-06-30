/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('HoldCtrl', function($scope, socket){
    $scope.hold = function(){
        socket.emit('hold', {});
    };

    $scope.unHold = function(){
        socket.emit('unhold', {});
    }
});