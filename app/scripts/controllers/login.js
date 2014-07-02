/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('LoginCtrl', function($scope, socket, agent){
    $scope.agentId = '101';
    $scope.login = function(){
        agent.setTips("登录中");
        socket.emit('login', {tenantId: VCC_TENANTID, agentId: $scope.agentId, password: $scope.password, ext: $scope.ext})
    };
});