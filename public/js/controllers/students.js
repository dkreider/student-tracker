var studentTracker = angular.module("studentTracker", ['angular-clipboard']);

studentTracker.controller("studentCtrl", function($scope, $http, clipboard, gradeManager) {

    $scope.selectedCourseGrades = []; // Used to store the grades of the selected course.
    $scope.newGrades            = []; // Used to store the new grade objects to be saved.

    angular.element(document).ready(function() {

        $scope.loadNewestStudentId();

    });

    $scope.addCourse = function(courseName) {

        console.log("Adding course " + courseName);
        $scope.courses.unshift(courseName);
        $scope.currentCourse = courseName;
        $scope.selectedCourseGrades = [];

    }

    $scope.loadCourseGrades = function(course) {

        $scope.selectedCourseGrades = [];

        for (var i = 0; i < $scope.grades.length; i++) {

            if ($scope.grades[i].name == course) {

                $scope.selectedCourseGrades.push($scope.grades[i].grade);

            }

        }   

    }

    $scope.loadStudent = function(studentId) {

        if (studentId == null) {

            Materialize.toast("No student id given!", 2000);
            $scope.clearData();
            return;

        } else {

            $scope.studentId = studentId;

            $http({

                method: "GET",
                url: "api/student",
                params: {studentId : $scope.studentId}

            }).then(function successCallBack(response) {

                if (response.data.error) {

                    Materialize.toast(response.data.error, 2000);
                    $scope.clearData();

                } else {

                    $scope.studentId = response.data.studentId;
                    $scope.name = response.data.name;
                    $scope.prisonerId = response.data.prisonerId;
                    $scope.wing = response.data.wing;
                    $scope.cell = response.data.cell;
                    $scope.address1 = response.data.address1;
                    $scope.address2 = response.data.address2;
                    $scope.city = response.data.city;
                    $scope.state = response.data.state;
                    $scope.zip = response.data.zip;
                    $scope.enrolled = new Date(response.data.enrolled);
                    $scope.lastHeard = new Date(response.data.lastHeard);
                    $scope.email = response.data.email;
                    $scope.religion = response.data.religion;
                    $scope.notes = response.data.notes;
                    $scope.courses = response.data.courses;
                    $scope.currentCourse = response.data.courses[0];
                    $scope.grades = response.data.grades;
                    $scope.loadCourseGrades($scope.currentCourse);

                }

            }, function errorCallBack(response) {

                Materialize.toast(response.data.error, 2000);
                console.log(response);
                $scope.clearData();

            });
        
        }

    }

    $scope.loadNewestStudentId = function() {

        $http({

            method: "GET",
            url: "api/newStudentId"

        }).then(function successCallBack(response) {

            if (response.data.error) {

                Materialize.toast("Error! " + response.data.error);
                console.log(response.data.error);
                $scope.clearData();

            } else {

                $scope.studentId = response.data.studentId;

            }

        }, function errorCallBack(response) {

            Materialize.toast("Error! " + response.data.error);
            console.log(error);
            $scope.clearData();

        });

    }

    $scope.clearData = function() {

        $scope.name = "";
        $scope.prisonerId = "";
        $scope.wing = "";
        $scope.cell = "";
        $scope.address1 = "";
        $scope.address2 = "";
        $scope.city = "";
        $scope.state = "";
        $scope.zip = "";
        $scope.enrolled = new Date();
        $scope.lastHeard = new Date();
        $scope.email = "";
        $scope.religion = "";
        $scope.notes = "";
        $scope.courses = [];
        $scope.currentCourseGrades = [];

        $scope.loadNewestStudentId();
       

    }

    $scope.deleteStudent = function() {

        if ($scope.studentId == null) {

            Materialize.toast("No student is selected!!!", 2000);
            return;

        } 

        var confirmDelete = confirm("Are you sure you want to delete " + $scope.name);

        if (confirmDelete == true) {


            $http({

                method: "DELETE",
                url: "api/student",
                params: {studentId: $scope.studentId}

            }).then(function successCallBack(response) {

                if (response.data.error != null) {

                    Materialize.toast("Error! " + response.data.error, 2000);
                    console.log(response.data.error);
                    $scope.clearData();

                } else {

                    Materialize.toast("Successfully deleted student.", 2000);
                    $scope.clearData();

                }

            }, function errorCallBack(response) {

                Materialize.toast("Error! " + response.data.error);
                console.log(response);
                $scope.clearData();
                
            });
        
        }

    }

    $scope.saveStudent = function() {

        if ($scope.studentId == null || $scope.name == "" || $scope.name == null) {

            Materialize.toast("Not enough of info given!", 2000);
            return;

        } else {

            $scope.newGrades = [];
            // Add grades of currently selected course.

            for (var i = 0; i < $scope.selectedCourseGrades.length; i++) {

                $scope.newGrades.push({
                    "name":$scope.currentCourse,
                    "grade": $scope.selectedCourseGrades[i]
                });

            }

            // Add grades of un-selected courses.

            for (var i = 0; i < $scope.courses.length; i++) {

                if ($scope.currentCourse != $scope.courses[i]) {

                    for (var x = 0; x < $scope.grades.length; x++) {

                        if ($scope.grades[x].name == $scope.courses[i]) {

                            $scope.newGrades.push({
                                "name":$scope.grades[x].name,
                                "grade":$scope.grades[x].grade
                            });

                        }

                    }   

                }

            }   

            $scope.studentId = parseInt($scope.studentId);
            $scope.prisonerId = parseInt($scope.prisonerId);
            $scope.wing = parseInt($scope.wing);
            $scope.cell = parseInt($scope.cell);
            $scope.enrolled = new Date($scope.enrolled);
            $scope.lastHeard = new Date($scope.lastHeard);

            $http({

                method: "POST",
                url: "api/student",
                data: { 

                        studentId: $scope.studentId, 
                        name:$scope.name, 
                        prisonerId:$scope.prisonerId, 
                        wing:$scope.wing, 
                        cell:$scope.cell, 
                        address1:$scope.address1, 
                        address2:$scope.address2, 
                        city:$scope.city, 
                        state:$scope.state,
                        zip:$scope.zip,
                        enrolled:$scope.enrolled,
                        lastHeard:$scope.lastHeard,
                        email:$scope.email,
                        religion:$scope.religion,
                        notes:$scope.notes,
                        courses:$scope.courses,
                        grades:$scope.newGrades

            }

            }).then(function successCallBack(response) {

                if (response.data.error) {

                    Materialize.toast(response.data.error.message, 2000);
                    console.log(response.data);
                    $scope.clearData();

                } else {

                    Materialize.toast("Successfully saved student!", 2000);
                    $scope.clearData();

                }

            }, function errorCallBack(response) {

                Materialize.toast(response, 2000);
                console.log(response);
                $scope.clearData();

            }); 

        } 
        
    }

    $scope.loadAddressInfo = function() {

        $http({

                method: "GET",
                url: "api/getAddressInfo",
                params: {cep : $scope.zip}

            }).then(function successCallBack(response) {

                if (response.data.error) {

                    Materialize.toast(response.data.error.MsgErro, 2000);
                    console.log(response.data.error);

                } else if (response.data.erro) {

                    Materialize.toast("Unknown error! " + response.data.erro, 2000);
                    console.log(response.data.erro);

                } else {

                    if ($scope.address1 == "" || $scope.address1 == null) {

                        $scope.address1 = response.data.logradouro;

                    }

                    if ($scope.address2 == "" || $scope.address2 == null) {

                        $scope.address2 = response.data.bairro;

                    }

                    $scope.city = response.data.localidade;
                    $scope.state = response.data.uf;
                    $scope.zip = response.data.cep;

                }

            }, function errorCallBack(response) {

                Materialize.toast(response.data.MsgErro, 2000);
                console.log(response);

            });        

    }

    $scope.search = function() {

        $http({

                method: "GET",
                url: "api/studentSearch",
                params: {searchTerm : $scope.searchTerm}

            }).then(function successCallBack(response) {

                if (response.data.error) {

                    console.log(response.data.error);

                } else {

                    $scope.searchResults = response.data;
                    console.log(response.data);

                }

            }, function errorCallBack(response) {

                Materialize.toast(response.data.error, 2000);
                console.log(response);

            });        

    }

    $scope.copyAddress = function () {

        var address = "#" + $scope.studentId;
        
        address += "\n" + $scope.name;

        if ($scope.prisonerId != null && $scope.prisonerId != "") {

            address += ", MT - " + $scope.prisonerId;

        }
        
        if ($scope.wing != null && $scope.cell != null) {

            address += "\nRaio " + $scope.wing + " Cela " + $scope.cell; 

        }

        address += "\n" + $scope.address1;

        if ($scope.address2 != "" && $scope.address2 != null) {

            address += "\n" + $scope.address2;

        }

        address += "\n" + $scope.city + " " + $scope.state + " " + $scope.zip;

        clipboard.copyText(address.toUpperCase());
        console.log(address);

    }

});