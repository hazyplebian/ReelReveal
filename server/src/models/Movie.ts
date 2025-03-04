import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface MovieAttributes {
  id: number;
  title: string;
  poster_url: string;
  release_year: number;
  genre: string;
}

class Movie extends Model<MovieAttributes> implements MovieAttributes {
  public id!: number;
  public title!: string;
  public poster_url!: string;
  public release_year!: number;
  public genre!: string;
}

Movie.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    poster_url: { type: DataTypes.STRING, allowNull: false },
    release_year: { type: DataTypes.INTEGER },
    genre: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Movie",
    timestamps: false,
  }
);

export default Movie;
