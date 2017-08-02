var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({

    courseId : {
        min: 0,
        type: Number,
        required : true,
        unique: true
    },

    name : {
        type: String,
        required : true
    },

    numberOfTests : Number,
    description : String

});

courseSchema.index({'$**': 'text'});

mongoose.model("Courses", courseSchema);