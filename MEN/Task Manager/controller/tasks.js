const Task = require('../models/Task')
const asyncWrapper = require('../middleware/asyncWrapper')
const {createCustomError} = require('../errors/customerror')

const getAllTasks = asyncWrapper(async (req,res,next) => {

    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const createTask = asyncWrapper(async (req,res,next) => {
    
    const task = await Task.create(req.body)
    res.status(201).json({task:task})
})

const getTask = asyncWrapper( async (req,res,next) => {

    const {id:taskId} = req.params
    const task  = await Task.findOne({_id:taskId})
    if(!task){
        return next(createCustomError(`Could not find the task with id: ${taskId}`,404))
    }
    
    res.status(200).json(task)
})

const updateTask = asyncWrapper( async (req,res,next) => {

    const {id:taskId} = req.params
    const updateQuery = req.body
    const task  = await Task.findOneAndUpdate({_id:taskId},updateQuery,{
        new:true,
        runValidators:true
    })
    if(!task){
        return next(createCustomError(`Could not find the task with id: ${taskId}`,404))
    }
    
    res.status(200).json(task)
})

const deleteTask = asyncWrapper( async (req,res,next) => {

    const {id:taskId} = req.params
    const task  = await Task.findOneAndDelete({_id:taskId})
    if(!task){
        return next(createCustomError(`Could not find the task with id: ${taskId}`,404))
    }
    
    res.status(200).json(task)
})

module.exports = {getAllTasks,getTask,createTask,updateTask,deleteTask}