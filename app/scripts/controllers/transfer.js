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

    $scope.type = '3';

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
    $scope.$on("agent_change", function(){
        disableBtn(agent.ctls);
    });

});