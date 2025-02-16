const pool = require('../config/db.config')
const UserService = require('../services/user.service')
const Token = require('../token/generate-token')

class UserController {
    async getUsers (req, res) {
        const users = await UserService.getAllUsers()
        if(!users){
            return res.status(404).json({msg: "Users do not exist"})
        }
        res.status(200).json(users)
    }
    
    async getUser (req,res) {
        const {userId} = req.params
        const user = await UserService.getOneUser(userId)
        if(!user){
            return res.status(404).json({msg: "User not found"})
        }
        res.status(200).json(user)
    }

    async addUser (req, res){
        const {username, userrole, email, parol} = req.body
        const newUser = await UserService.createUser(username, userrole, email, parol)
        let payload = { email: newUser.email, role: newUser.userrole };
        
        let generatetoken = Token.createToken(payload)
        res.status(201).json({msg: 'New user created successfully', user: newUser, token: generatetoken})
    }

    async updateUser (req, res){
        const {userId} = req.params
        const { username, userrole, email, parol } = req.body;
        const updatedUser = await UserService.updateUser(username, userrole, email, parol, userId)
         if(!updatedUser){
            return res.status(404).json({msg: "User not found"})
         }
        res.status(200).json({msg: "User updated successfully", user: updatedUser})
    }

    async deleteUser (req, res){
        const {userId} = req.params
      const result =  await UserService.deleteUser(userId)
        if(result === null){
            return res.status(404).json({msg: 'User not found'})
        }
        res.status(200).json({msg: "User deleted successfully"})
    }
}

module.exports = new UserController()