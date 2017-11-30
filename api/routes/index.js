const express = require("express");
const router = express.Router();

const ctrlStudent = require("../controllers/student");
const ctrlCourses = require("../controllers/courses");
const ctrlAddress = require("../controllers/address");
const ctrlReports = require("../controllers/reports");

router
    .route("/student")
    .get(ctrlStudent.loadStudent)
    .post(ctrlStudent.saveStudent)
    .delete(ctrlStudent.deleteStudent);

router
    .route("/newStudentId")
    .get(ctrlStudent.newStudentId);

router
    .route("/studentSearch")
    .get(ctrlStudent.studentSearch);

router
    .route("/courses")
    .get(ctrlCourses.loadCourse)
    .post(ctrlCourses.saveCourse)
    .delete(ctrlCourses.deleteCourse);

router
    .route("/newCourseId")
    .get(ctrlCourses.newCourseId);

router
    .route("/courseSearch")
    .get(ctrlCourses.courseSearch);

router
    .route("/getAddressInfo")
    .get(ctrlAddress.loadAddressInfo);

router
    .route("/reports")
    .get(ctrlReports.getStats);

module.exports = router;