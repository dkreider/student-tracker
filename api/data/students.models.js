var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({

    studentId : {
        min: 0,
        type: Number,
        required : true,
        unique: true
    },

    name : {
        type: String,
        required : true
    },

    prisoner: Boolean,
    prisonerId : String,
    wing : Number,
    cell : Number,
    address1 : String,
    address2 : String,
    city : String,
    state : String,
    zip : String,
    enrolled : Date,
    lastHeard : Date,
    birthYear : String,
    status : String,
    marriageStatus: String,
    email : String,
    religion: String,
    notes : String,

    courses : [String],
    grades : [{

        gradeId: Number,
        name: String,
        grade: Number,
        dateAdded: String

    }]

});

studentSchema.index({'$**': 'text'});

mongoose.model("Student", studentSchema);