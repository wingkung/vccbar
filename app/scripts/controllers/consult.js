/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('ConsultCtrl', function($scope, socket, agent){
    $scope.types = [
        {value: '2', display: '号码'},
        {value: '3', display: '坐席'}
    ];

    $scope.type = '3';

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
    socket.on('scene', function(data){
        disableBtn(data.ctls);
    });

    $scope.consult = function(){
        socket.emit('consult', {type: $scope.type, target: $scope.target});
    };

    $scope.cancel = function(){
        socket.emit('consult_cancel', {});
    };

    $scope.transfer = function(){
        socket.emit('consult_transfer', {});
    };

    $scope.bridge = function(){
        socket.emit('consult_bridge', {});
    };
});