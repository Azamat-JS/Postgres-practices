import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class Group extends Model {
    public id!: number;
    public subject!: string;
    public days!:string;
    public time!:string;
    public teacher_name!:string;
    public teacher_phone!:string;
}


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
