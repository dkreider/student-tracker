/**
 * 
 * Used to get statistics. 
 * 
 */ 

var mongoose = require("mongoose");
var Students = mongoose.model("Student");

module.exports.getStats = function(req, res) {

    var studentTotal = 0;
    var activeTotal  = 0;
    var newTotal     = 0;

    Students.find(function(error, success) {

        if (error) {

            console.log(error);
            res
            .status(500)
            .json({"error": error});

        } else {

            for (i = 0; i < success.length; i++) {

                studentTotal++;

                if (success[i].courses.length > 0 && success[i].grades.length > 0) {

                    activeTotal++;

                } else {

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