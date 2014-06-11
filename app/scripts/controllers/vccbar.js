var app = angular.module('vccbarApp');
app.controller('VccbarCtrl', function($scope, $log, socket){
    $scope.agent = {
        logined: false,
        tenantId: "",
        agentId: "",
        state: ""
    };

    $scope.dialog = {
        open: false,
        content: '',
        left: 0
    };

    $scope.bar = {
        sign: '>',
        collapse: false
    };

    $scope.collapseBar = function(){
        var collapse = !$scope.bar.collapse;
        if (collapse){
            $scope.bar.sign = '<';
        }else{
            $scope.bar.sign = '>';
        }
        $scope.bar.collapse = collapse;
    };

    $scope.openDialog = function(content, $event){
        $scope.dialog.open = true;
        $scope.dialog.content = content;
        $scope.dialog.left = $event.clientX - $event.offsetX;
    };

    $scope.hideDialog = function(){
        $scope.dialog.open = false;
    };

    $scope.loginTitle = "未连接";
    socket.on('connect', function(){
        $scope.loginTitle = "已连接";
    })
});
