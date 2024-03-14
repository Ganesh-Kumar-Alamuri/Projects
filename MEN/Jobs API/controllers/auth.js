const User = require('../models/User')
const {BadRequestError,UnauthenticatedError} = require('../errors')
const {StatusCodes} = require('http-status-codes')


const register = async (req,res) => {
    const {email, name, password} = req.body
       
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:user,token:token})

}

const login = async (req,res) => {
    const {email,password} = req.body
    if(!email, !password){
        throw new BadRequestError("Please provide all Credentials")
    }

    const user = await User.findOne({email:email})
    if(!user){
        throw new UnauthenticatedError("User doesnot exist")
    }

    const isPasswordCorrect  = await user.checkPassword(password)

    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Password is incorrect")
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:user,token})
}

module.exports = {register,login}