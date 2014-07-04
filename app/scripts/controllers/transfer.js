/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('TransferCtrl', function($scope, socket, agent){
    $scope.types = [
        {value: '2', display: '号码'},
        {value: '3', display: '坐席'},
        {value: '1', display: '自动语音'},
        {value: '4', display: '队列'}
    ];

    $scope.agents = [];
    $scope.ivrs = [];
    $scope.queues = [];
    $scope.type = '2';

    $scope.transfer = function(){
        agent.setTips("转移中");
        socket.emit('transfer', {type:$scope.type, target: $scope.target});
    };

    $scope.disTransfer = true;
    disableBtn(agent.ctls);
    function disableBtn(ctls){
        if (agent.hasCtl(ctls, agent.ctl.A_TRANS)){
            $scope.disTransfer = false;
        }else{
            $scope.disTransfer = true;
        }
    }

    $scope.typeChange = function(){
        $scope.target = '';
        if ($scope.type == 3){
            socket.emit('agents_info', {});
        } else if ($scope.type == 4){
            socket.emit('queues_info', {});
        } else if ($scope.type == 1){
            socket.emit('ivrs_info', {});
        }
    };

    $scope.$on('agents_info', function(event, data){
        $scope.agents = [];
        angular.forEach(data, function(item){
            $scope.agents.push({value: item.agentId, display: item.name + '(' + item.agentId + ')' + item.stateDescr});
        });
    });

    $scope.$on('ivrs_info', function(event, data){
        $scope.ivrs = [];
        angular.forEach(data, function(item){
            $scope.ivrs.push({value: item.ivrId, display: item.name + '(' + item.ivrId + ')'});
        });
    });

    $scope.$on('queues_info', function(event, data){
        $scope.ivrs = [];
        angular.forEach(data, function(item){
            $scope.queues.push({value: item.queueId, display: item.name + '(' + item.queueId + ')'});
        });
    });

    $scope.$on("agent_change", function(){
        disableBtn(agent.ctls);
    });

});