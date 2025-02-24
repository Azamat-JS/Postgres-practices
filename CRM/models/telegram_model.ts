import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class TelegramMessage extends Model {
  public id!: number;
  public username!: string;
  public message!: string;
}

TelegramMessage.init(
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
    tableName: "messages",
    modelName: "Message",
    timestamps: true,
  }
);

export default TelegramMessage;
