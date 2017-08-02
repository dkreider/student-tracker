angular.module("studentTracker").controller("loadCourses", function($scope, $http) {

    $scope.loadCourses = function() {

        $http({

            method: "GET",
            url: "api/courses"

        }).then(function successCallBack(response) {

            if (response.data.error) {

                Materialize.toast("Error! " + response.data.error);
                console.log(response.data.error);

            } else {

                $scope.availableCourses = response.data;

            }

        }, function errorCallBack(response) {

            Materialize.toast("Error! " + response);
            console.log(response);

        });

    }

});