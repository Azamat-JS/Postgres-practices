const pool = require('../config/db.config')

class TaskService {
    async getAllTasks(){
        const tasks = await pool.query('select * from tasks')
        if(tasks.rows.length === 0){
            return null;
        }
        return tasks.rows
    }

   async getOneTask(taskId){
        const task = await pool.query('select * from tasks where taskId = $1', [taskId])
        if(task.rows.length === 0){
            return null;
        }
        return task.rows[0]
    }

    async createTask(title, kind, color, category, created_by){
        const newTask = await pool.query(`
            insert into tasks(title, kind, color, category, created_by)
            values($1, $2, $3, $4, $5) returning *`, 
            [title, kind, color, category, created_by])

            return newTask.rows[0]
    }

    async updateTask(title, kind, color, category, taskId){
       const editedTask = await pool.query(
        `update tasks set title = $1, kind = $2, color = $3, category = $4 where taskId = $5 returning *`,
    [title, kind, color, category, taskId]);
     
    if(editedTask.rows.length === 0){
        return null;
    }

    return editedTask.rows[0]
    }

    async deleteTask(taskId){
        const foundTask = await pool.query('select * from tasks where taskId = $1', [taskId])

        if(foundTask.rows.length === 0){
            return null;
        }

       await pool.query('delete from tasks where taskId = $1', [taskId])
    
       return true;
    }
}

module.exports = new TaskService()