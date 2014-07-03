/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('ConsultCtrl', function($scope, socket, agent){
    $scope.types = [
        {value: '2', display: '号码'},
        {value: '3', display: '坐席'}
    ];

    $scope.type = '2';
    $scope.agents = [];

    $scope.disConsult = true;
    $scope.disConsultCancel = true;
    $scope.disConsultTrans = true;
    $scope.disConsultBridge = true;
    disableBtn(agent.ctls);
    function disableBtn(ctls){
        if (agent.hasCtl(ctls, agent.ctl.A_CONSULT)){
            $scope.disConsult = false;
            $scope.disConsultCancel = false;
        }else{
            $scope.disConsult = true;
            $scope.disConsultCancel = true;
        }

        if (agent.hasCtl(ctls, agent.ctl.A_CONSULT_TRANS)){
            $scope.disConsultTrans = false;
            $scope.disConsultCancel = false;
            $scope.disConsultBridge = false;
        }else{
            $scope.disConsultTrans = true;
            $scope.disConsultCancel = true;
            $scope.disConsultBridge = true;
        }
    }


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

    $scope.$on("agent_change", function(){
        disableBtn(agent.ctls);
    });

    $scope.consult = function(){
        agent.setTips('咨询中');
        socket.emit('consult', {type: $scope.type, target: $scope.target});
    };

    $scope.cancel = function(){
        agent.setTips('取消中');
        socket.emit('consult_cancel', {});
    };

    $scope.transfer = function(){
        agent.setTips('转移中');
        socket.emit('consult_transfer', {});
    };

    $scope.bridge = function(){
        agent.setTips('三方中');
        socket.emit('consult_bridge', {});
    };
});