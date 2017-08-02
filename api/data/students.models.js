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

    prisonerId : Number,
    wing : Number,
    cell : Number,
    address1 : String,
    address2 : String,
    city : String,
    state : String,
    zip : String,
    enrolled : Date,
    lastHeard : Date,
    email : String,
    religion: String,
    status : Boolean,
    notes : String,

    courses : [String],
    grades : [{

        name: String,
        grade: Number

    }]

});

studentSchema.index({'$**': 'text'});

mongoose.model("Student", studentSchema);