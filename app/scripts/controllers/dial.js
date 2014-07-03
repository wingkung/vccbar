/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('DialCtrl', function($scope, socket, agent){
    $scope.types = [
        {value: '2', display: '号码'},
        {value: '3', display: '坐席'}
    ];

    $scope.agents = [];

    $scope.type = '2';

    $scope.dial = function(){
        agent.setTips("呼叫中");
        socket.emit('dial', {type: $scope.type, target: $scope.target, code400: VCC_CODE400, code: VCC_CODE});
    };

    $scope.typeChange = function(){
        if ($scope.type == 3){
            socket.emit('agents_info', {});
        }
    };

    $scope.$on('agents_info', function(event, data){
        $scope.agents = [];
        angular.forEach(data, function(item){
            $scope.agents.push({value: item.agentId, display: item.name + '(' + item.agentId + ')' + item.stateDescr});
        });
    });

    $scope.disDial = true;
    disableBtn(agent.ctls);
    function disableBtn(ctls){
        if (agent.hasCtl(ctls, agent.ctl.A_DIAL)){
            $scope.disDial = false;
        }else{
            $scope.disDial = true;
        }
    }
    $scope.$on("agent_change", function(){
        disableBtn(agent.ctls);
    });
});