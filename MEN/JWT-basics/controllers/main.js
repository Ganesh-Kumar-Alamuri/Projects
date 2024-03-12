const {customAPIError,BadRequestError} = require('../errors')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req,res) => {
    const {username,password} =req.body
    if(!username || !password){
        throw new BadRequestError("Username and password required")
    }
    const id = new Date().getDate()
    const token = jwt.sign({id,username},process.env.SECRET,{expiresIn:'30d'})
    res.status(200).json({msg:"Login Successful",token})
} 

const dashboard = async (req,res) => {
    
    const luckNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello ${req.user.username}`,secret:`Here is your lucky Number: ${luckNumber}`})
}
module.exports = {login,dashboard}