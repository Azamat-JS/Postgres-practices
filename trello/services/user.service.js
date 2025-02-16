const pool = require('../config/db.config')

class UserService {
    async getAllUsers(){
        const users = await pool.query('select * from users')
        if(users.rows.length === 0){
            return null;
        }
        return users.rows
    }

   async getOneUser(userId){
        const user = await pool.query('select * from users where userId = $1', [userId])
        if(user.rows.length === 0){
            return null;
        }
        return user.rows[0];
    }

    async createUser(username, userrole, email, parol){
        const newUser = await pool.query(`
            insert into users(username, userrole, email, parol)
            values($1, $2, $3, $4) returning *`, 
            [username, userrole, email, parol]);

            return newUser.rows[0]
    }

    async updateUser(username, userrole, email, parol, userId){
       const editedUser = await pool.query(
        `update users set username = $1, userrole = $2, email = $3, parol = $4 where userId = $5 returning *`,
    [username, userrole, email, parol, userId]);
    if(editedUser.rows.length === 0){
        return null;
    }
    return editedUser.rows[0]
    }

    async deleteUser(userId){
        const foundUser = await pool.query('select * from users where userId = $1', [userId])
        if(foundUser.rows.length === 0){
            return null;
        }
          await pool.query('delete from users where userId = $1', [userId])
        return true
    }
}

module.exports = new UserService()