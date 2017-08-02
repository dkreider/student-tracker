var studentTracker = angular.module("studentTracker", []);

studentTracker.controller("coursesCtrl", function($scope, $http) {

    angular.element(document).ready(function() {

        $scope.loadNextCourseId();

    });

    $scope.loadCourse = function(courseId) {

        $http({

            method: "GET",
            url: "api/courses",
            params: {"courseId": courseId}

        }).then (function successCallBack(response) {

            if (response.data.error) {

                $scope.clearFields();
                Materialize.toast(response.data.error, 2000);
                console.log(response.data.error);

            } else {

                $scope.courseId = response.data.courseId;
                $scope.name = response.data.name;
                $scope.numberOfTests = response.data.numberOfTests;
                $scope.description = response.data.description;

            }

        }, function errorCallBack(response) {

            Materialize.toast("Error! " + response, 3000);
            console.log(response);

        });

    }

    $scope.clearFields = function() {

        $scope.name = "";
        $scope.numberOfTests = "";
        $scope.description = "";
        $scope.loadNextCourseId();

    }

    $scope.loadNextCourseId = function() {

        $http({

            method: "GET",
            url: "api/newCourseId"

        }).then (function successCallBack(response) {

            $scope.courseId = response.data.courseId;

        }, function errorCallBack(response) {

            Materialize.toast("Error trying to load next course id! " + response);
            console.log(response);

        });

    }

    $scope.saveCourse = function() {

        $http({

            method: "POST",
            url: "api/courses",
            data: {

                "courseId":$scope.courseId,
                "name": $scope.name,
                "numberOfTests": $scope.numberOfTests,
                "description": $scope.description

            }

        }).then (function successCallBack(response) {

            if (response.data.error) {

                Materialize.toast("Error! " + response.data.error, 2000);
                console.log(response.data.error);

            } else {

                Materialize.toast("Successfully saved!", 2000);
                $scope.clearFields();

            }

        }, function errorCallBack(response) {

            Materialize.toast("Error trying to load next course id! " + response);
            console.log(response);

        });

    }

    $scope.deleteCourse = function() {

        var confirmation = confirm("Are you sure?");

        if (confirmation == true) {

            $http({

                method: "DELETE",
                url: "api/courses",
                params: {"courseId": $scope.courseId}

            }).then(function successCallBack(response) {

                if (response.data.error) {

                    $scope.clearFields();
                    Materialize.toast("Error! " + response.data.error, 2000);
                    console.log(response.data.error)

                } else {

                    Materialize.toast("Successfully deleted!", 2000);
                    $scope.clearFields();

                }

            }, function errorCallBack(response) {

                $scope.clearFields();
                Materialize.toast("Error! " + response, 2000);
                console.log(response);

            });

        }

    }

    $scope.searchCourses = function() {

        $http({

            method: "GET",
            url: "api/courseSearch",
            params: {"searchTerm":$scope.searchTerm}

        }).then(function successCallBack(response) {

            $scope.searchResults = response.data;

        }, function errorCallBack(response) {

            console.log(response);

        });

    }

});