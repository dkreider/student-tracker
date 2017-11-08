/**
 * 
 * Used to get statistics. 
 * 
 */ 

var config = require("../config");
var mongoose = require("mongoose");
var Students = mongoose.model("Student");

module.exports.getStats = function(req, res) {

    var studentTotal = 0;
    var activeTotal  = 0;
    var newTotal     = 0;

    Students.find(function(error, students) {

        if (error) {

            console.log(error);
            res
            .status(500)
            .json({"error": error});

        } else {

            for (i = 0; i < students.length; i++) {

                studentTotal++;

                if (students[i].status == config.activeStudentsTitle) {

                    activeTotal++;

                } else if (students[i].status == config.candidateStudentsTitle) {

                    newTotal++;

                }

            }

            res.json({

                "studentTotal":studentTotal,
                "activeTotal":activeTotal,
                "newTotal":newTotal

            });
        }

    });

}