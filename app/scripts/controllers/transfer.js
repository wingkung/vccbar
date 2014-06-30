/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');
app.controller('TransferCtrl', function($scope, socket){
    $scope.types = [
        {value: '2', display: '号码'},
        {value: '3', display: '坐席'},
        {value: '1', display: '自动语音'},
        {value: '4', display: '队列'}
    ];

    $scope.type = '3';

    $scope.transfer = function(){
        socket.emit('transfer', {type:$scope.type, target: $scope.target});
    };

});