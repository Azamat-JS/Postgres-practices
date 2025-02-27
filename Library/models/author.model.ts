import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class Author extends Model {
    public id!: number;
    public name!: string;
}

Author.init(
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
    },
    {
        sequelize,
        tableName: "authors",
        modelName: "Author",
        timestamps: false,
    }
);

export default Author;
