import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Date } from "mongoose";

export class Student extends Model {
    public id!: number;
    public student_name!: string;
    public student_phone!:string;
    public subject!: string;
    public parents_name!: string;
    public parents_phone!: string;
    public joinedAt!: Date;
    public leftAt!: Date | null
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
        leftAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'students',
        modelName: 'Student',
        timestamps:true
    }
);