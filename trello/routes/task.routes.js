const TaskController = require('../controller/task.ctr')
const TokenChecker = require('../middleware/checkToken')

const router = require('express').Router()

router.get('/get_tasks', TokenChecker.checkUserToken, TaskController.getAllTasks)
router.post('/create_task', TokenChecker.checkAdminToken, TaskController.createTask)
router.get('/get_one_task/:taskId', TokenChecker.checkUserToken, TaskController.getOneTask)
router.put('/update_task/:taskId', TokenChecker.checkAdminToken, TaskController.updateTask)
router.delete('/delete_task/:taskId', TokenChecker.checkAdminToken, TaskController.deleteTask)

module.exports = router