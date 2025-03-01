import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Date } from "mongoose";

export class Attendances extends Model {
    public id!: number;
    public studentId!: string;
    public Date!: Date;
}

Attendances.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        studentId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        Date:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: 'attendances',
        timestamps:true
    }
);