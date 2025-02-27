import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Author from "./author.model"; 

export class Book extends Model {
    public id!: number;
    public name!: string;
    public price!: string;
    public authorId!: number;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "authors",
                key: "id",
            },
            field: "authorId",
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "books",
        modelName: "Book",
        timestamps: false,
    }
);

export default Book;
