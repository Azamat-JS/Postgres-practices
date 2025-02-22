import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class Payments extends Model {
   public id!: number;
   public student_name!:string;
   public subject!:string;
   public student_phone!:string;
   public teacher_name!:string;
   public date!:string;
}


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