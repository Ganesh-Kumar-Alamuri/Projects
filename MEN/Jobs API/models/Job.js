const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required: [true,"Company name is required" ],
        maxlength: 30
    },
    position:{
        type: String,
        required: [true, "Position is required"],
        maxlength: 50
    },
    status:{
        type: String,
        enum:{
            values:['Applied','Assessment','Interview','Offered'],
            message: "Not a valid status"
        },
        default:"Applied"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: [true, "Created By is required"]
    },
    
},{timestamps:true})

module.exports = new mongoose.model('Job',jobSchema)