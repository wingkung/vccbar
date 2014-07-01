/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('DialCtrl', function($scope, socket, agent){
    $scope.types = [
        {value: '2', display: '号码'},
        {value: '3', display: '坐席'}
    ];

    $scope.type = '2';

    $scope.dial = function(){
        socket.emit('dial', {type: $scope.type, target: $scope.target, code400: VCC_CODE400, code: VCC_CODE});
    };

    $scope.disDial = true;
    disableBtn(agent.ctls);
    function disableBtn(ctls){
        if (agent.hasCtl(ctls, agent.ctl.A_DIAL)){
            $scope.disDial = false;
        }else{
            $scope.disDial = true;
        }
    }
    $scope.$watch(agent.ctls, function(){
        console.log(agent.ctls);
        disableBtn(agent.ctls);
    });
});