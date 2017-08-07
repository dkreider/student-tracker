var studentTracker = angular.module("studentTracker", []);

studentTracker.controller("reportsCtrl", function($scope, $http) {

    $scope.studentTotal = 0;
    $scope.activeTotal  = 0;
    $scope.newTotal     = 0;

    angular.element(document).ready(function() {

        $http({

            method: "GET",
            url: "api/reports"

        }).then(function successCallBack(response) {

            $scope.studentTotal = response.data.studentTotal;
            $scope.activeTotal = response.data.activeTotal;
            $scope.newTotal = response.data.newTotal;

        }, function errorCallBack(response) {

            Materialize.toast("Error! " + response.data.message, 2000);
            console.log(response.data);

        });


    });

});