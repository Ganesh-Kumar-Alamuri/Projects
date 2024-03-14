const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

const getAllJobs = async (req,res) => {
    const jobs = await Job.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({count:jobs.length,jobs})
}

const getJob = async (req,res) => {
    
    const {
        params:{
            id:jobID
        },
        user:{
            name:userName,
            userId:userID
        }

    } = req
    const job = await Job.findById({_id:jobID,createdBy:userID})
    if(!job){
        throw new NotFoundError("Job not found with given id")
    }
    res.status(StatusCodes.CREATED).json({job})
}

const createJob = async (req,res) => {
    const {
        body:{
            company:companyName,
            position:position
        },
        user:{
            name:userName,
            userId:userID
        }

    } = req
    if(!companyName || !position){
        throw new BadRequestError("Please provide company and position")
    }
    const job = await Job.create({company:companyName,position:position,createdBy:userID})
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req,res) => {
    const {
        params:{
            id:jobID
        },
        user:{
            name:userName,
            userId:userID
        }
    } = req
    // if(!companyName || !position){
    //     throw new BadRequestError("Please provide company and position")
    // }
    const job = await Job.findByIdAndUpdate(
        {
            createdBy:userID,_id:jobID
        },
        {...req.body},
        {
            new:true,
            runValidators:true
        })
    if(!job){
        throw new NotFoundError("Job not found with given id")
    }
    res.status(StatusCodes.OK).json({job})

}

const deleteJob = async (req,res) => {
    const {
        params:{
            id:jobID
        },
        user:{
            name:userName,
            userId:userID
        }
    } = req
    // if(!companyName || !position){
    //     throw new BadRequestError("Please provide company and position")
    // }
    const job = await Job.findByIdAndRemove({createdBy:userID,_id:jobID})
    if(!job){
        throw new NotFoundError("Job not found with given id")
    }
    res.status(StatusCodes.OK).json({job})
}

module.exports = {getAllJobs,getJob,createJob,updateJob,deleteJob}