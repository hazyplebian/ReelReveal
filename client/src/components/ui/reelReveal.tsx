import React, { useState, useEffect, useLayoutEffect } from "react";
import auth from "../../utils/auth";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { retrieveUserStreak, updateUserStreak } from "../../api/userAPI";

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
  const [totalWins, setTotalWins] = useState<number>(0);
  const [guess, setGuess] = useState<string>(""); // User's current guess
  const [revealed, setRevealed] = useState<boolean>(false); // Indicates whether the answer is revealed
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null); // Stores the current movie to guess
  const [guessAttempt, setGuessAttempt] = useState<number>(0); // Tracks the number of guess attempts
  const [loginCheck, setLoginCheck] = useState(false);

  // Fetch movies from an API on component mount
  const TOTAL_PAGES = 500; // TMDB API allows up to 500 pages for some endpoints
  const genreMap: { [key: number]: string } = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western', };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const handleNextMovie = async () => {
    try {
      const randomPage = Math.floor(Math.random() * TOTAL_PAGES) + 1;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${randomPage}`
      );
  
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error("No movies found");
      }
  
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      const creditsResponse = await fetch( `https://api.themoviedb.org/3/movie/${randomMovie.id}/credits?api_key=${import.meta.env.VITE_API_KEY}&certification_country=US&certification.lte=R` );
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

  const handleWinStreak = async (isCorrect?: Boolean) => {
    if(isCorrect === undefined) {
      const data = await retrieveUserStreak();
      setWinStreak(data.streak);
      setTotalWins(data.wins);
    } 
    else {
      if(isCorrect){
        await updateUserStreak({streak: winStreak + 1, wins: totalWins + 1});
        setWinStreak(winStreak + 1);
        setTotalWins(totalWins + 1);
      } else {
        await updateUserStreak({streak: 0, wins: totalWins});
        setWinStreak(0);
      }
    }
  }

  useEffect(() => {
    if(auth.loggedIn())
      handleWinStreak();

    handleNextMovie();
  }, []);

  // Handle the user's guess submission
  const handleGuess = () => {
    const isCorrect = guess.toLowerCase() === currentMovie?.title.toLowerCase(); // Compare guesses case-insensitively
    if (isCorrect) {
    setRevealed(true);
    if(auth.loggedIn())
      handleWinStreak(isCorrect);
    setGuessAttempt(0) // Increase streak if correct, reset if wrong
    } else {
      if (guessAttempt === 5) {
    setRevealed(true)
    if(auth.loggedIn())
      handleWinStreak(isCorrect);
    setGuessAttempt(0) // Increase streak if correct, reset if wrong
    } else {
    setGuessAttempt(guessAttempt + 1);
  } 
    }
  };

  return (
    <div className="flex justify-center items-center text-light">
      <Card className="text-center">
        <CardContent>
        <div
         style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "top",
          gap: "10px",
          }}>
          <div className="flex-inline p-5 bebas-neue-regular">
            {loginCheck &&
            <>
              <h4 className="mb-3">WIN STREAK</h4>
              <h1 className="font-weight-bold mb-3">{winStreak}</h1>
              <h4 className="mb-3">TOTAL WINS</h4>
              <h1 className="font-weight-bold">{totalWins}</h1>
            </>
            }
          </div>
          <div className="flex-inline">
            <img
              src={currentMovie?.poster}
              alt="Movie Poster"
              className={`w-full h-80 object-cover pl-5 pr-5 ${revealed ? "" : "blur-md"}`}
            />
          </div>  
          <div className="flex-inline bebas-neue-regular">
            {!revealed ? (
              <div className="p-5">
              <h4 className="mb-4">Guess Attempt</h4>
              <h1 className="font-weight-bold">{guessAttempt} / 6</h1>
              </div>
            ) : (null)
            }
            {revealed &&
            <h4 className="mb-4 font-weight-bold">
              {guess.toLowerCase() === currentMovie?.title.toLowerCase() ? <span className="text-success">YOU ARE CORRECT</span> : <span className="text-danger">YOU ARE INCORRECT</span>}
            </h4>
            }

            {/* Input for user guess, shown only if answer is not revealed */}
            {!revealed && (
              <div className="form-inline justify-content-center">
              <div className="form-group">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="form-control p-2 mr-2"
                  placeholder="What is the movie title?"
                />
              </div>
              <Button onClick={handleGuess}>Submit</Button>
              </div>
            )}
            
            {/* Display the result if the answer is revealed */}
              <div className="mt-4">
                <p className="h5 font-weight-bold mb-3 font-italic">{revealed ? currentMovie?.title : '********'}</p>
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">Year</th>
                      <td>{revealed || guessAttempt > 0 ? currentMovie?.year : '****'}</td>
                    </tr>
                    <tr>
                      <th scope="row">Genre</th>
                      <td>{revealed || guessAttempt > 1 ? currentMovie?.genre : '********'}</td>
                    </tr>
                    <tr>
                      <th scope="row">Director</th>
                      <td>{revealed || guessAttempt > 2 ? currentMovie?.director : '********'}</td>
                    </tr>
                    <tr>
                      <th scope="row">Actors</th>
                      <td>{revealed || guessAttempt > 3 ? currentMovie?.actors : '********'}</td>
                    </tr>
                    <tr>
                      <th scope="row">Description</th>
                      <td>{revealed ||guessAttempt > 4 ? currentMovie?.description : '********'}</td>
                    </tr>
                  </tbody>
                </table>
                
                {/* Button to proceed to the next movie */}
                {revealed && <Button className="mt-4 btn btn-success" onClick={handleNextMovie}>Next Movie</Button>}
            </div>
          </div>  
        </div>  
        </CardContent>
      </Card>
    </div>
  );
};

export default ReelReveal;