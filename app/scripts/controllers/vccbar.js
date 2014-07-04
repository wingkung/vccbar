var app = angular.module('vccbarApp');
app.controller('VccbarCtrl', function($scope, $log, socket, agent, $timeout){
    $scope.agent = {
        logined: false
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

    function reset(){
        $scope.agent.logined = false;
        $scope.bar.sign = '>';
        $scope.bar.collapse = false;
    }

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

    $scope.connectedTitle = "未连接";
    $scope.$on("agent_change", function(){
        if (agent.connected){
            $scope.connectedTitle = "连接";
        }else{
            $scope.connectedTitle = "断开";
            $scope.agent.logined = false;
        }
        $scope.agent.logined = agent.logined;
        if (agent.logined){
            $scope.hideDialog();
        }else{
            reset();
        }
        if (agent.tips != ""){
            $scope.errorTitle = agent.tips;
            $timeout(function(){
                $scope.errorTitle = '';
                agent.tips = '';
            }, 5000);
        }else{
            $scope.errorTitle = "";
        }
    });
});
