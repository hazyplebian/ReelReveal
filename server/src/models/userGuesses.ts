import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Movie from "./Movie";

interface UserGuessesAttributes {
  id: number;
  user_id: number;
  movie_id: number;
  is_correct: boolean;
}

class UserGuesses
  extends Model<UserGuessesAttributes>
  implements UserGuessesAttributes
{
  public id!: number;
  public user_id!: number;
  public movie_id!: number;
  public is_correct!: boolean;
}

UserGuesses.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Movie, key: "id" },
    },
    is_correct: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
    modelName: "UserGuesses",
    timestamps: true,
  }
);

// Define associations
User.hasMany(UserGuesses, { foreignKey: "user_id" });
Movie.hasMany(UserGuesses, { foreignKey: "movie_id" });
UserGuesses.belongsTo(User, { foreignKey: "user_id" });
UserGuesses.belongsTo(Movie, { foreignKey: "movie_id" });

export default UserGuesses;
