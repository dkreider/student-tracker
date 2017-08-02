studentTracker.service("gradeManager", function() {

    var studentGrades;

    var setGrades = function(grades) {

        studentGrades = grades;

    }

    var returnGrades = function(course) {

        var grades = [];

    for (grade in studentGrades) {

            console.log(grade);

        }

    }

    var setGrade = function(course, grade) {

        grades.push({
            course:course,
            grade:grade
        });

    }

    return {

        setGrades:setGrades,
        returnGrades:returnGrades

    }

});