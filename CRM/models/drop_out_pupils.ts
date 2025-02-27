import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class DropOutList extends Model {
    public id!: number;
    public student_name!:string;
    public student_phone!:string;
}


DropOutList.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        student_name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        student_phone:{
            type:DataTypes.STRING,
            allowNull:true,
        },
    },
    {
        sequelize,
        tableName: 'dropoutlist',
        modelName: 'DropOutList',
        timestamps:true
    }
);
