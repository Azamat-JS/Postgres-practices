import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class TelegramAppeals extends Model {
  public id!: number;
  public username!: string;
  public message!: string;
}

TelegramAppeals.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "appeals",
    modelName: "Appeal",
    timestamps: true,
  })

  export default TelegramAppeals