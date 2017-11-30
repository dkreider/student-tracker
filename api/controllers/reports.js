/**
 * 
 * Used to get statistics. 
 * 
 */ 

const config = require("../config");
const mongoose = require("mongoose");
const Students = mongoose.model("Student");

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

            for (let student of students) {

                studentTotal++;

                if (student.status == config.activeStudentsTitle) {

                    activeTotal++;

                } else if (student.status == config.candidateStudentsTitle) {

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