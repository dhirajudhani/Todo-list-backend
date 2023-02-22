// require the library
const { default: mongoose } = require('mongoose');
const mongose = require('mongoose');

// creating Schema for Tasks
const taskSchema = new mongoose.Schema({
    description : {
        type:String,
        required : true
    },
    category : {
        type: String,
        required: true
    },
    date : {
        type : Date,
        required: true
    }
});

const Task = mongoose.model('Task',taskSchema);
// exporting the Schema

module.exports = Task;