const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Task Name Required"],
        maxlength:[20,"Name should not be more than 20 characters"],
        trim:true
    },
    completed: {
        type:Boolean,
        default:false
    }
})

module.exports  = mongoose.model('Task',taskSchema)