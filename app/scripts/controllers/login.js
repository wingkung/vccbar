/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('LoginCtrl', function($scope, socket){
    $scope.agentId = '101';
    $scope.login = function(){
        socket.emit('login', {tenantId: VCC_TENANTID, agentId: $scope.agentId, password: $scope.password, ext: $scope.ext})
    };
});