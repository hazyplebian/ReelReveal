// models/game.ts

export interface Game {
    id: string;
    movieId: string;
    difficulty: string;
    startTime: Date;
    endTime?: Date;
    questionIds: string[];
    isActive: boolean;
  }
  
  export class GameImpl implements Game {
    id: string;
    movieId: string;
    difficulty: string;
    startTime: Date;
    endTime?: Date;
    questionIds: string[];
    isActive: boolean;
  
    constructor(movieId: string, difficulty: string, questionIds: string[], id?: string) {
      if(id){
        this.id = id;
      } else {
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
      this.movieId = movieId;
      this.difficulty = difficulty;
      this.startTime = new Date();
      this.questionIds = questionIds;
      this.isActive = true;
    }
  
    endGame(): void {
      this.endTime = new Date();
      this.isActive = false;
    }
  }