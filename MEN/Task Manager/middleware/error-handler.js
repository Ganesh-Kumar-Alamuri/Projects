const {customAPIError} = require('../errors/customerror')

const errorHandler = (err,req,res,next) => {
    if(err instanceof customAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:"Something went wrong"})
}

module.exports = errorHandler