export interface Record {
    id: string; 
    userId: string; 
    movieId: string; 
    score: number;
    timestamp: Date;
    correctAnswers: number;
    incorrectAnswers: number;
    timeTaken: number;
    difficulty: string;
  }
  
  export class RecordImpl implements Record {
    id: string;
    userId: string;
    movieId: string;
    score: number;
    timestamp: Date;
    correctAnswers: number;
    incorrectAnswers: number;
    timeTaken: number;
    difficulty: string;
  
    constructor(
      userId: string,
      movieId: string,
      score: number,
      correctAnswers: number,
      incorrectAnswers: number,
      timeTaken: number,
      difficulty: string,
      id?: string 
    ) {
      if(id){
        this.id = id;
      } else {
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
      this.userId = userId;
      this.movieId = movieId;
      this.score = score;
      this.timestamp = new Date();
      this.correctAnswers = correctAnswers;
      this.incorrectAnswers = incorrectAnswers;
      this.timeTaken = timeTaken;
      this.difficulty = difficulty;
    }
  }