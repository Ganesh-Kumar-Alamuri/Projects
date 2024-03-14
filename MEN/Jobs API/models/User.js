const mongoose = require("mongoose")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please provide Name"],
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        required: [true, "Please provide Email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid Email"
        ],
        unique: true
    },
    password:{
        type:String,
        required: [true, "Please provide Password"],
        minlength: 6
    }
})

userSchema.pre('save',async function (){
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password,salt)
    
})

userSchema.methods.createJWT = function (){
    return jwt.sign({userid:this._id,username:this.name},process.env.SECRET,{
        expiresIn:"30d"
    })
    
}

userSchema.methods.checkPassword = async function(providedPassword){
    const match = await bcryptjs.compare(providedPassword,this.password)
    return match
}



module.exports = new mongoose.model('User',userSchema)