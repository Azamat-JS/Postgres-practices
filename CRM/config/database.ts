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

export class Student extends Model {
    public id!: number;
    public student_name!: string;
    public student_phone!:string;
    public subject!: string;
    public parents_name!: string;
    public parents_phone!: string;
}

export class Group extends Model {
    public id!: number;
    public subject!: string;
    public days!:string;
    public time!:string;
    public teacher_name!:string;
    public teacher_phone!:string;
}

export class Payments extends Model {
   public id!: number;
   public student_name!:string;
   public subject!:string;
   public student_phone!:string;
   public teacher_name!:string;
   public date!:string;
}

Student.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        student_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        student_phone:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        subject:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        parents_name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        parents_phone:{
            type:DataTypes.STRING,
            allowNull:true,
        },
    },
    {
        sequelize,
        tableName: 'students',
        modelName: 'Student',
        timestamps:true
    }
);


Group.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        subject:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        days:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        time:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        teacher_name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        teacher_phone:{
            type:DataTypes.STRING,
            allowNull:true,
        },
    },
    {
        sequelize,
        tableName: 'groups',
        modelName: 'Group',
        timestamps:true
    }
);
Payments.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        student_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        student_phone:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        subject:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        teacher_name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        date:{
            type:DataTypes.STRING,
            allowNull:true,
        },
    },
    {
        sequelize,
        tableName: 'payments',
        modelName: 'Payment',
        timestamps:true
    }
);

sequelize
     .authenticate()
     .then(() => {
        console.log('The database connected successfully'); 
     }).catch((err) => {
      console.error('Failed to connect to the database')
     })

sequelize.sync({force:false})