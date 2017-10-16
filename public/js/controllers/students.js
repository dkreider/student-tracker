var studentTracker = angular.module("studentTracker", ['angular-clipboard']);

studentTracker.controller("studentCtrl", function($scope, $http, clipboard, studentData) {

    $scope.selectedCourseGrades = []; // Used to store the grades of the selected course.
    $scope.newGrades            = []; // Used to store the new grade objects to be saved.
    $scope.courses              = []; // Used to store student's courses.
    $scope.grades               = []; // Used to store student's grades.
    $scope.lastStudent          = 0;  // Used to store last student loaded.    
    $scope.newStudent           = true; // Used to know whether or not we're saving a new student or updating an existing one.

    angular.element(document).ready(function() {

        $scope.loadNewestStudentId();
        $scope.enrolled = new Date();
        $scope.lastHeard = new Date();
        $scope.status = "Candidate";
        $scope.marriageStatus = "Unknown";
        $scope.religion = "Indisponível";

        // Register our keyboard shortcuts.
        var listener = new window.keypress.Listener();

        // Go back a student.
        listener.simple_combo("ctrl alt b", function() {

            var studentId = --$scope.studentId;
            $scope.loadStudent(studentId);

        });

        // Go forward a student.
        listener.simple_combo("ctrl alt f", function() {

            var studentId = ++$scope.studentId;
            $scope.loadStudent(studentId);

        });

        // Load previously loaded student.
        listener.simple_combo("ctrl alt l", function() {

            $scope.loadStudent($scope.lastStudent);

        });

        // Clear screen.
        listener.simple_combo("ctrl alt n", function() {

            $scope.clearData();

        });

        // Open add course model
        listener.simple_combo("ctrl alt a", function() {

            $("#addCourse").modal("open");
            $("#newCourse").focus().select();

        });

        // Save student.
        listener.simple_combo("f9", function() {

            $scope.saveStudent();

        });

        // Delete student. 
        listener.simple_combo("f8", function() {

            $scope.deleteStudent();

        });

        // Select search field.
        listener.simple_combo("f6", function() {

            $("#search").focus().select();

        });

    });

    $scope.addCourse = function(courseName) {

        for (var i = 0; i < $scope.courses.length; i++) {

            if ($scope.courses[i] == courseName) {

                Materialize.toast("You are not allowed the assign the same course to a student twice!", 3000);
                return;
            }

        }

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

            studentData.loadStudent(studentId).then(function(response) {

                if (response.data.error) {

                    Materialize.toast(response.data.error, 2000);
                    $scope.clearData();
                    return;

                }

                $scope.newStudent = false;
                $scope.studentId = response.data.studentId;
                $scope.name = response.data.name;
                $scope.prisoner = response.data.prisoner,
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
                $scope.birthYear = response.data.birthYear,
                $scope.status = response.data.status;
                $scope.marriageStatus = response.data.marriageStatus,
                $scope.email = response.data.email;
                $scope.religion = response.data.religion;
                $scope.notes = response.data.notes;
                $scope.courses = response.data.courses;
                $scope.currentCourse = response.data.courses[0];
                $scope.grades = response.data.grades;
                $scope.loadCourseGrades($scope.currentCourse);

                $('#notes').trigger('autoresize');

            });
        
        }

    }

    $scope.loadNewestStudentId = function() {

        studentData.getNewStudentId().then(function(response) {

            if (response.data.error) {

                Materialize.toast(response.data.error, 2000);
                return;

            }

            $scope.newStudent = true;
            $scope.studentId = response.data.studentId;

        });

    }

    $scope.clearData = function() {

        $scope.lastStudent = $scope.studentId;
        $scope.name = "";
        $scope.prisoner = false;
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
        $scope.birthYear = "";
        $scope.marriageStatus = "Unknown";
        $scope.status = "Candidate";
        $scope.email = "";
        $scope.religion = "Indisponível";
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

        alertify.confirm("Huh?", "Are you sure you want to delete " + $scope.name + "?", function() {

                studentData.deleteStudent($scope.studentId).then(function(response) {
                    
                    if (response.data.error) {

                        Materialize.toast(response.data.error, 2000);
                        return;

                    }

                    Materialize.toast("Successfully deleted student!", 2000);
                    $scope.clearData();

                });
            
            }, function() {

                Materialize.toast($scope.name + " was not deleted.", 2000);

            });

    }

    $scope.saveStudent = function() {

        if ($scope.studentId == null || $scope.name == "" || $scope.name == null) {

            Materialize.toast("Not enough of info given!", 2000);
            return;

        }

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

        if ($scope.prisonerId && $scope.prisonerId.length == 6) {

            var prisonerId = $scope.prisonerId;
            $scope.prisonerId = prisonerId.slice(0, 3) + "-" + prisonerId.slice(3);

        }

        if ($scope.newStudent) {

            studentData.getNewStudentId().then(function(response) {

                if (response.data.error) {

                    Materialize.toast(response.data.error);
                    return;

                }
                
                var student = new Object();
                student.studentId = parseInt(response.data.studentId);
                student.name = $scope.name;
                student.prisoner = $scope.prisoner,
                student.prisonerId = $scope.prisonerId;
                student.wing = parseInt($scope.wing);
                student.cell = parseInt($scope.cell);
                student.address1 = $scope.address1; 
                student.address2 = $scope.address2; 
                student.city = $scope.city; 
                student.state = $scope.state;
                student.zip = $scope.zip;
                student.enrolled = new Date($scope.enrolled);
                student.lastHeard = new Date();
                student.birthYear = $scope.birthYear;
                student.marriageStatus = $scope.marriageStatus;
                student.status = $scope.status;
                student.email = $scope.email;
                student.religion = $scope.religion;
                student.notes = $scope.notes;
                student.courses = $scope.courses;
                student.grades = $scope.newGrades;
        
                studentData.saveStudent(student).then(function(saveStudentResponse) {

                    if (response.data.error) {

                        Materialize.toast(saveStudentResponse.data.error, 2000);
                        return;

                    }

                    Materialize.toast("Successfully saved student!", 2000);
                    $scope.clearData();
        
                });
        
    
            });

        } else {

            var student = new Object();
            student.studentId = parseInt($scope.studentId);
            student.name = $scope.name;
            student.prisoner = $scope.prisoner;
            student.prisonerId = $scope.prisonerId;
            student.wing = parseInt($scope.wing);
            student.cell = parseInt($scope.cell);
            student.address1 = $scope.address1; 
            student.address2 = $scope.address2; 
            student.city = $scope.city; 
            student.state = $scope.state;
            student.zip = $scope.zip;
            student.enrolled = new Date($scope.enrolled);
            student.lastHeard = new Date();
            student.birthYear = $scope.birthYear;
            student.marriageStatus = $scope.marriageStatus;
            student.status = $scope.status;
            student.email = $scope.email;
            student.religion = $scope.religion;
            student.notes = $scope.notes;
            student.courses = $scope.courses;
            student.grades = $scope.newGrades;
    
            studentData.saveStudent(student).then(function(response) {

                if (response.data.error) {

                    Materialize.toast(response.data.error);
                    return;

                }
    
                Materialize.toast("Successfully updated student!", 2000);
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

                    $scope.address1 = response.data.logradouro;
                    $scope.address2 = response.data.bairro;
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

        $scope.searchResults = null;

        studentData.search($scope.searchTerm).then(function(response) {

            if (response.data.error) {

                console.log(response.data.error);   
                return;

            }

            $scope.searchResults = response.data;

        }); 

    }

    $scope.copyAddress = function () {

        var address = "#" + $scope.studentId;
        
        address += "\n" + $scope.name;

        if ($scope.prisonerId != null && $scope.prisonerId != "") {

            address += ", MT: " + $scope.prisonerId;

        }
        
        if ($scope.wing != null) {

            address += "\nRaio " + $scope.wing; 

        }

        if ($scope.cell != null) {

            if ($scope.wing == null) {

                address += "\nCela " + $scope.cell;

            } else {

                address += " Cela " + $scope.cell;

            }

        }

        address += "\n" + $scope.address1;

        if ($scope.address2 != "" && $scope.address2 != null) {

            address += "\n" + $scope.address2;

        }

        address += "\n" + $scope.zip + " " + $scope.city + " - " + $scope.state;

        clipboard.copyText(address.toUpperCase());
        console.log(address);

    }

    $scope.getCertInfo = function () {

        var certInfo = $scope.name.toUpperCase();
        var sum = 0;
        var average = 0;

        certInfo += "\n\n\n" + $scope.currentCourse;

        for (i in $scope.selectedCourseGrades) {

            if (isNaN($scope.selectedCourseGrades[i]) == false) {

                sum += $scope.selectedCourseGrades[i];

            }

        }

        average = sum / $scope.selectedCourseGrades.length;
        certInfo += "\n\n" + average.toPrecision(2);
        clipboard.copyText(certInfo);

    }


});