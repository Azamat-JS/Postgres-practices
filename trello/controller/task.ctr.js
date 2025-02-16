const pool = require('../config/db.config')
const TaskService = require('../services/task.service')

class TaskController {
async getAllTasks(req,res, next){
    const tasks = await TaskService.getAllTasks()
    if(!tasks){
        return next(res.status(404).json({msg: 'Tasks not found'}))
    }
    res.status(200).json(tasks)
}

async createTask(req, res){
    req.body.created_by = req.user.userEmail
    const {title, kind, color, category, created_by} = req.body
    const task = await TaskService.createTask(title, kind, color, category, created_by)

    res.status(201).json({msg: 'New task created successfully', task:task})
}

async getOneTask(req, res, next){
    const {taskId} = req.params
    const task = await TaskService.getOneTask(taskId)

    if(!task){
       return next(res.status(404).json({msg: 'Task not found'}))
    }
    res.status(200).json(task)
}

async updateTask(req, res, next){
    const {taskId} = req.params
    const {title, kind, color, category} = req.body
    const updatedTask = await TaskService.updateTask(title, kind, color, category, taskId)

    if(!updatedTask){
        return next(res.status(404).json({msg: 'Task not found'}))
    }
    res.status(200).json({msg: 'The task updated successfully', updatedTask})
}
async deleteTask(req, res, next){
    const {taskId} = req.params
    const result = await TaskService.deleteTask(taskId)

    if(result === null){
        return next(res.status(404).json({msg: "Task not found"}))
    }
    res.status(200).json({msg: 'The task deleted successfully'})
}
}

module.exports = new TaskController()