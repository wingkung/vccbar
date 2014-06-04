var app = angular.module('vccbarApp');
app.controller('VccbarCtrl', function($scope, $log){
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

    $scope.openDialog = function(content, left){
        $scope.dialog.open = true;
        $scope.dialog.content = content;
        $scope.dialog.left = left;
    };

    $scope.hideDialog = function(){
        $scope.dialog.open = false;
    }
});
