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

    $scope.isConsult = true;

    socket.on('scene', function(data){
        if (agent.hasCtl(data.ctls, agent.ctl.A_CONSULT)){
            $scope.isConsult = true;
        }else{
            $scope.isConsult = false;
        }
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