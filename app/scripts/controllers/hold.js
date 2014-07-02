/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('HoldCtrl', function($scope, socket, agent){
    $scope.hold = function(){
        agent.setTips("保持中");
        socket.emit('hold', {});
    };

    $scope.unHold = function(){
        agent.tips = "取消中";
        socket.emit('unhold', {});
    };

    $scope.disHold = true;
    $scope.disUnHold = true;
    disableBtn(agent.ctls);
    function disableBtn(ctls){
        if (agent.hasCtl(ctls, agent.ctl.A_HOLD)){
            $scope.disHold = false;
        }else{
            $scope.disHold = true;
        }

        if (agent.hasCtl(ctls, agent.ctl.A_UNHOLD)){
            $scope.disUnHold = false;
        }else{
            $scope.disUnHold = true;
        }
    }
    $scope.$on("agent_change", function(){
        disableBtn(agent.ctls);
    });
});