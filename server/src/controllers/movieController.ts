import { Request, Response } from "express";
import Movie from "../models/Movie";
import axios from "axios";

const MOVIE_API_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = process.env.TMDB_API_KEY;

export const getRandomMovie = async (req: Request, res: Response) => {
    try {
      const movies = await Movie.findAll();
      
      if (movies.length === 0) {
        return res.status(404).json({ error: "No movies found" });
      }
  
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      
      return res.json(randomMovie);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch movie" });
    }
  };
  

export const getMovieDetails = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
};
