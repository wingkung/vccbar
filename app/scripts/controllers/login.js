/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('LoginCtrl', function($scope, socket, $timeout){
    $scope.login = function(){
        socket.emit('login', {tenantId: tenantId, agentId: $scope.agentId, password: $scope.password, ext: $scope.ext})
    };

    socket.on('login', function(data){
        if (data.rtn){

        }else{
        }
    })
});