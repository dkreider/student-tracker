/**
 * 
 * Used to get, save and update course info.
 * 
 */ 

var mongoose = require("mongoose");
var Courses = mongoose.model("Courses");

module.exports.loadCourse = function(req, res) {

    if (req.query.courseId == null || req.query.courseId == "") {

        Courses.find(function(err, results) {

            if (err) {

                res
                .status(500)
                .json({"error": err});
                console.log(err);

            } else {

                res.json(results);

            }

        });

    } else {

        Courses.findOne({"courseId":req.query.courseId}, function(err, course) {

            if (err) {

                res
                .status(500)
                .json({"error": err});

            } else if (course == null) {

                res.json({"error": "Course doesn't exist!"});

            } else {

                res.json(course);

            }

        });

    }

}

module.exports.saveCourse = function(req, res) {

    if (req.body.courseId == null || req.body.courseId == "" || req.body.name == "" || req.body.name == null) {

        res
        .status(400)
        .json({"error": "Not enough of info was provided."});
        return;

    }

    Courses.findOne({"courseId":req.body.courseId}, function(err, course) {

        if (err) {

            res
            .status(500)
            .json({"error": err});

        } else if (course == null) {

            // Course doesn't exist. creating...
            Courses.create({

                courseId : req.body.courseId,
                name: req.body.name,
                numberOfTests: req.body.numberOfTests,
                description: req.body.description
                

            }, function(err, course) {

                if (err) {

                    res.status(500)
                    .json({"error": err});

                } else {

                    res.status(201)
                    .json(course);

                }

            });


        } else {

            // Course exists. updating...
            Courses.findOneAndUpdate({

                courseId: req.body.courseId

                }, {

                    name: req.body.name,
                    numberOfTests: req.body.numberOfTests,
                    description: description

                }, function(err, course) {

                     if (err) {

                        res.status(500)
                        .json({"error": err});

                        console.log(err);

                    } else {

                        res.status(201)
                        .json(course);
                        console.log("Updated course.");

                    }

            });

        }

    });

}

module.exports.deleteCourse = function(req, res) {

    if (req.query.courseId == null || req.query.courseId == "") {

        res
        .status(400)
        .json({"error": "Expected courseId param containing course id."});
        return;

    }

    Courses.remove({"courseId":req.query.courseId}, function(err, course) {

        if (err) {

            res
            .status(500)
            .json({"error": err});

        } else if (course == null) {

            res
            .status(400)
            .json({"error": "Course doesn't exist!"});

        } else {

            res.json(course);

        }

    });

}

module.exports.newCourseId = function(req, res) {

    Courses.find(function(error, success) {

        if (error) {

            console.log(error);
            res
            .status(500)
            .json({"error": error});

        } else {

            var courseId = 0;

            for (i = 0; i < success.length; i++) {

                if (success[i].courseId > courseId) {

                    courseId = success[i].courseId;

                }

            }

            courseId++;
            res.json({"courseId" : courseId});
        }

    });

}

module.exports.courseSearch = function(req, res) {

    if (req.query.searchTerm == null || req.query.searchTerm == "") {

        res
        .status(400)
        .json({"error": "Expected searchTerm param containing search term."});
        return;

    }

    Courses.find({$text: {$search: req.query.searchTerm}}, function(err, results) {

        if (err) {

            res
            .status(500)
            .json({"error": err});

        } else if (results == null || results == "") {

            res
            .status(400)
            .json({"error": "No results found"});

        } else {

            res.json(results);

        }

    });

}