/**
 * 
 * Used to get, save and update student info.
 * 
 */ 

var mongoose = require("mongoose");
var Student = mongoose.model("Student");

module.exports.loadStudent = function(req, res) {

    if (req.query.studentId == null || req.query.studentId == "") {

        res
        .status(400)
        .json({"error": "Expected studentId param containing student id."});
        return;

    }

    Student.findOne({"studentId":req.query.studentId}, function(err, student) {

        if (err) {

            res
            .status(500)
            .json({"error": err});

        } else if (student == null) {

            res.json({"error": "Student doesn't exist!"});

        } else {

            res.json(student);

        }

    });

}

module.exports.saveStudent = function(req, res) {

    console.log(req.body);

    Student.findOne({"studentId":req.body.studentId}, function(err, student) {

        if (err) {

            res
            .status(500)
            .json({"error": err});

        } else if (student == null) {

            // Student doesn't exist. creating...
            Student.create({

                studentId : req.body.studentId,
                name : req.body.name,
                prisoner : req.body.prisoner,
                prisonerId : req.body.prisonerId,
                wing : req.body.wing,
                cell : req.body.cell,
                address1 : req.body.address1,
                address2 : req.body.address2,
                city : req.body.city,
                state : req.body.state,
                zip : req.body.zip,
                enrolled : req.body.enrolled,
                lastHeard : req.body.lastHeard,
                birthYear : req.body.birthYear,
                status: req.body.status,
                marriageStatus: req.body.marriageStatus,
                email: req.body.email,
                religion: req.body.religion,
                notes: req.body.notes,
                courses: req.body.courses,
                grades:req.body.grades

            }, function(err, student) {

                if (err) {

                    res.status(500)
                    .json({"error": err});

                } else {

                    res.status(201)
                    .json(student);

                }

            });


        } else {

            // Student exists. updating...

            console.log("Student exists... Updating.");

            Student.findOneAndUpdate({

                studentId: req.body.studentId

                }, {

                    name : req.body.name,
                    prisoner : req.body.prisoner,
                    prisonerId : req.body.prisonerId,
                    wing : req.body.wing,
                    cell : req.body.cell,
                    address1 : req.body.address1,
                    address2 : req.body.address2,
                    city : req.body.city,
                    state : req.body.state,
                    zip : req.body.zip,
                    enrolled : req.body.enrolled,
                    lastHeard : req.body.lastHeard,
                    birthYear : req.body.birthYear,
                    status: req.body.status,
                    marriageStatus: req.body.marriageStatus,
                    email: req.body.email,
                    religion: req.body.religion,
                    notes: req.body.notes,
                    courses: req.body.courses,
                    grades:req.body.grades
                    

                }, function(err, student) {

                     if (err) {

                        res.status(500)
                        .json({"error": err});

                        console.log(err);

                    } else {

                        res.status(201)
                        .json(student);
                        console.log("Updated student.");

                    }

            });

        }

    });

}

module.exports.deleteStudent = function(req, res) {

    if (req.query.studentId == null || req.query.studentId == "") {

        res
        .status(400)
        .json({"error": "Expected studentId param containing student id."});
        return;

    }

    Student.remove({"studentId":req.query.studentId}, function(err, student) {

        if (err) {

            res
            .status(500)
            .json({"error": err});

        } else if (student == null) {

            res
            .status(400)
            .json({"error": "Student doesn't exist!"});

        } else {

            res.json(student);

        }

    });

}

module.exports.newStudentId = function(req, res) {

    Student.find(function(error, success) {

        if (error) {

            console.log(error);
            res.json({"error": error});

        } else {

            var studentId = 0;

            for (i = 0; i < success.length; i++) {

                if (success[i].studentId > studentId) {

                    studentId = success[i].studentId;

                }

            }

            studentId++;
            res.json({"studentId" : studentId});
        }

    });

}

module.exports.studentSearch = function(req, res) {

    if (req.query.searchTerm == null || req.query.searchTerm == "") {

        res
        .status(400)
        .json({"error": "Expected searchTerm param containing search term."});
        return;

    }

    Student.find({$text: {$search: req.query.searchTerm}}, function(err, results) {

        if (err) {

            res
            .status(500)
            .json({"error": err});

        } else if (results == null || results == "") {

            res.json({"error": "No results found"});

        } else {

            res.json(results);

        }

    });

}