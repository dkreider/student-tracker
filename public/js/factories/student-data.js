angular.module("studentTracker").factory("studentData", function studentData($http) { 

    return {

        loadStudent:loadStudent,
        saveStudent:saveStudent,
        deleteStudent:deleteStudent,
        search:search,
        getNewStudentId:getNewStudentId

    }

    function loadStudent(studentId) {

        if (studentId == null) {
            
            Materialize.toast("No student is selected!!!", 2000);
            return;

        } 

        return $http.get("api/student?studentId=" + studentId).then(complete).catch(failed);

    }

    function saveStudent(student) {

        if (student == null) {

            Materialize.toast("Ooops! Student data is invalid or null!", 2000);
            return;

        } 

        return $http.post("api/student", student).then(complete).catch(failed);

    }

    function deleteStudent(studentId) {

        if (studentId == null) {
            
            Materialize.toast("No student is selected!!!", 2000);
            return;

        } 

        return $http.delete("api/student?studentId=" + studentId).then(complete).catch(failed);

    }

    function getNewStudentId() {

        return $http.get("api/newStudentId").then(complete).catch(failed);

    }

    function search(searchTerm) {

        return $http.get("api/studentSearch?searchTerm=" + '"' + searchTerm + '"').then(complete).catch(failed);

    }

    function complete(response) {

        return response;

    }

    function failed(error) {

        console.log("studentData factory error! " + error.statusText);
        console.log(error);
        return;

    }

});