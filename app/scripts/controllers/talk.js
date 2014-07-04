/**
 * Created by wing on 2014/7/4.
 */
var app = angular.module('vccbarApp');
app.controller('TalkCtrl', function($scope, socket, agent){
    $scope.hold = function(){
        agent.setTips("保持中");
        $scope.disHold = true;
        socket.emit('hold', {});
    };

    $scope.unHold = function(){
        agent.tips = "取消中";
        $scope.disUnHold = true;
        socket.emit('unhold', {});
    };
    $scope.hangup = function(){
        agent.tips = "挂机中";
        $scope.disHangup = true;
        socket.emit('hangup', {});
    };

    $scope.disHold = true;
    $scope.disUnHold = true;
    $scope.disHangup = true;
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

        if (agent.hasCtl(ctls, agent.ctl.A_TRANS)){
            $scope.disHangup = false;
        }else{
            $scope.disHangup = true;
        }
    }
    $scope.$on("agent_change", function(){
        disableBtn(agent.ctls);
    });
});