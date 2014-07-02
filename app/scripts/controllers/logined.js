/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('LoginedCtrl', function($scope, socket, agent){
    $scope.agentName = agent.agentName;
    $scope.agentId = agent.agentId;
    $scope.ext = agent.ext;
    $scope.stateDescr = agent.stateDescr;

    $scope.$on("agent_change", function(){
        $scope.agentName = agent.agentName;
        $scope.agentId = agent.agentId;
        $scope.ext = agent.ext;
        $scope.stateDescr = agent.stateDescr;
    });

    $scope.changeExt = function(){

    };

    $scope.logout = function(){
        agent.setTips("登出中");
        socket.emit('logout', {});
    };

    $scope.busy = function(){
        agent.setTips("示忙中");
        socket.emit('change_state', {state: 1});
    };

    $scope.idle = function(){
        agent.setTips("示闲中");
        socket.emit('change_state', {state: 0});
    };
});