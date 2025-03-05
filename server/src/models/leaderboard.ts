import { Sequelize, Model, DataTypes } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

interface LeaderboardEntry {
  userId: number;
  username: string;
  winStreak: number;
  score: number;
}

export class Leaderboard extends Model<LeaderboardEntry>{
  public userId!: number;
  public username!: string;
  public winStreak!: number;
  public score!: number;
}

export function LeaderboardSystem(sequelize: Sequelize): typeof Leaderboard {
  Leaderboard.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      winStreak: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'leaderboard',
      sequelize,
    }
  );

  return Leaderboard;
}