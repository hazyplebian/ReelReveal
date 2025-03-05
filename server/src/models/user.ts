  export interface User {
    id: string; 
    username: string;
    displayName: string; 
    email?: string; 
    avatarUrl?: string; 
    registrationDate: Date;
    lastLogin?: Date;
    totalScore: number;
    gamesPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
    highestScore?: number;

  }
  
  export class UserImpl implements User {
    id: string;
    username: string;
    displayName: string;
    email?: string;
    avatarUrl?: string;
    registrationDate: Date;
    lastLogin?: Date;
    totalScore: number;
    gamesPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
    highestScore?: number;
  
    constructor(username: string, displayName: string, id: string, email?: string, avatarUrl?: string) {
      this.id = id;
      this.username = username;
      this.displayName = displayName;
      this.email = email;
      this.avatarUrl = avatarUrl;
      this.registrationDate = new Date();
      this.totalScore = 0;
      this.gamesPlayed = 0;
      this.correctAnswers = 0;
      this.incorrectAnswers = 0;
      this.highestScore = 0;
    }
  
    updateScore(score: number, correct: boolean) {
      this.totalScore += score;
      this.gamesPlayed++;
      if (correct) {
        this.correctAnswers++;
        if(this.highestScore === undefined || score > this.highestScore){
          this.highestScore = score;
        }
      } else {
        this.incorrectAnswers++;
      }
    }
  
    updateLastLogin() {
      this.lastLogin = new Date();
    }
  }