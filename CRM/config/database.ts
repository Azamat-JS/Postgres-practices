import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()


const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false
})


sequelize
     .authenticate()
     .then(() => {
        console.log('The database connected successfully'); 
     }).catch((err) => {
      console.error('Failed to connect to the database', err)
     })

sequelize.sync({force:false})


export default sequelize