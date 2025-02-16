const UserController = require('../controller/user.ctr')
const TokenChecker = require('../middleware/checkToken')

const router = require('express').Router()

router.get('/get_users', TokenChecker.checkUserToken, UserController.getUsers)
router.post('/add_user', UserController.addUser)
router.get('/get_one_user/:userId', TokenChecker.checkUserToken, UserController.getUser)
router.put('/edit_user/:userId', TokenChecker.checkAdminToken, UserController.updateUser)
router.delete('/delete_user/:userId', TokenChecker.checkAdminToken,UserController.deleteUser)

module.exports = router