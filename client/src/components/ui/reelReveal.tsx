import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

// Define the structure of a Movie object
interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
  actors: string;
  genre: string;
  description: string;
  poster: string;
}

// Main component for the movie guessing game
const ReelReveal: React.FC = () => {
  // State variables 
  const [winStreak, setWinStreak] = useState<number>(0); // Tracks consecutive correct guesses
  const [guess, setGuess] = useState<string>(""); // User's current guess
  const [revealed, setRevealed] = useState<boolean>(false); // Indicates whether the answer is revealed
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null); // Stores the current movie to guess
  const [guessAttempt, setGuessAttempt] = useState<number>(1); // Tracks the number of guess attempts

  // Fetch movies from an API on component mount
  const API_KEY = "cbc15a5e6d53cf95d684a17b6545e0e8";
  const TOTAL_PAGES = 500; // TMDB API allows up to 500 pages for some endpoints
  const genreMap: { [key: number]: string } = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western', };

  const handleNextMovie = async () => {
    try {
      const randomPage = Math.floor(Math.random() * TOTAL_PAGES) + 1;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${randomPage}`
      );
  
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error("No movies found");
      }
  
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      const creditsResponse = await fetch( `https://api.themoviedb.org/3/movie/${randomMovie.id}/credits?api_key=${API_KEY}` );
      const creditsData = await creditsResponse.json();

      setRevealed(false);
      setGuess("");
      setCurrentMovie({
        id: randomMovie.id,
        title: randomMovie.title,
        year: randomMovie.release_date.split("-")[0],
        director: creditsData.crew.find((person: any) => person.job === 'Director')?.name || 'Unknown',
        actors: creditsData.cast.slice(0, 5).map((actor: any) => actor.name).join(", ") || 'Unknown',
        genre: randomMovie.genre_ids.map((genreId: number) => { return genreId in genreMap ? genreMap[genreId] : "Unknown"}).join(", "),
        description: randomMovie.overview,
        poster: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`,
      });
    } catch (error) {
      console.error("Error fetching random movie:", error);
      setCurrentMovie(null);
    }
  };

  useEffect(() => {
    handleNextMovie();
  }, []);

  // Handle the user's guess submission
  const handleGuess = () => {
    const isCorrect = guess.toLowerCase() === currentMovie?.title.toLowerCase(); // Compare guesses case-insensitively
      if (isCorrect) {
    setRevealed(true);
    setWinStreak(isCorrect ? winStreak + 1 : 0); // Increase streak if correct, reset if wrong
    } else {
      if (guessAttempt === 6) {
    setRevealed(true)
    setWinStreak(isCorrect ? winStreak + 1 : 0); // Increase streak if correct, reset if wrong
    } else {
    setGuessAttempt(guessAttempt + 1);
  } 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <Card className="p-6 w-[600px] text-center">
        <CardContent>
          <p className="text-lg font-bold">MOVIE POSTER</p>
          <img
            src={currentMovie?.poster}
            alt="Movie Poster"
            className={`w-full h-80 object-cover mb-4 ${revealed ? "" : "blur-md"}`}
          />
          <p className="text-lg">WIN STREAK: {winStreak}</p>
          <p>Guess Attempt: {guessAttempt}/6</p>
          
          {/* Input for user guess, shown only if answer is not revealed */}
          {!revealed && (
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="p-2 text-black w-full rounded-md my-2"
              placeholder="What is the movie title?"
            />
          )}
          
          {/* Submit button for guessing */}
          {!revealed && <Button onClick={handleGuess}>Submit</Button>}
          
          {/* Display the result if the answer is revealed */}
          {/* {revealed && ( */}
            <div className="mt-4">
              <p className={`text-xl font-bold ${guess.toLowerCase() === currentMovie?.title.toLowerCase() ? "text-green-500" : "text-red-500"}`}>
                {guess.toLowerCase() === currentMovie?.title.toLowerCase() ? "YOU ARE CORRECT" : "YOU ARE INCORRECT"}
              </p>
              <p className="text-xl font-bold">{revealed ? currentMovie?.title : '***'}</p>
              <p><strong>Year:</strong> {guessAttempt > 1 ? currentMovie?.year : '***'}</p>
              <p><strong>Genre:</strong> {guessAttempt > 2 ? currentMovie?.genre : '***'}</p>
              <p><strong>Director:</strong> {guessAttempt > 3 ? currentMovie?.director : '***'}</p>
              <p><strong>Actors:</strong> {guessAttempt > 4 ? currentMovie?.actors : '***'}</p>
              <p className="text-sm mt-2">{guessAttempt > 5 ? currentMovie?.description : '***'}</p>
              
              {/* Button to proceed to the next movie */}
              <Button className="mt-4" onClick={handleNextMovie}>Next Movie</Button>
            </div>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default ReelReveal;