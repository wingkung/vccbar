/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('LoginedCtrl', function($scope, socket, agent){
    $scope.agentName = agent.agentName;
    $scope.agentId = agent.agentId;
    $scope.ext = agent.ext;
    $scope.stateDescr = agent.stateDescr;

    socket.on('info', function(data){
        $scope.agentName = data.agentName;
        $scope.agentId = data.agentId;
        $scope.ext = data.ext;
    });

    socket.on('state', function(data){
        $scope.stateDescr = data.stateDescr;
    });


    $scope.changeExt = function(){

    };

    $scope.logout = function(){
        socket.emit('logout', {});
    };

    $scope.busy = function(){
        socket.emit('change_state', {state: 1});
    };

    $scope.idle = function(){
        socket.emit('change_state', {state: 0});
    };
});