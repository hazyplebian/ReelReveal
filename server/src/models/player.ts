export interface Player {
    id: string;
    userId: string;
    gameId: string;
    score: number;
    currentQuestionIndex: number;
    timeRemaining: number;
    isFinished: boolean;
  }
  
  export class PlayerImpl implements Player {
    id: string;
    userId: string;
    gameId: string;
    score: number;
    currentQuestionIndex: number;
    timeRemaining: number;
    isFinished: boolean;
  
    constructor(userId: string, gameId: string, id?: string) {
      if(id){
        this.id = id;
      } else {
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
      this.userId = userId;
      this.gameId = gameId;
      this.score = 0;
      this.currentQuestionIndex = 0;
      this.timeRemaining = 0;
      this.isFinished = false;
    }
  
    updateScore(points: number): void {
      this.score += points;
    }
  
    nextQuestion(): void {
      this.currentQuestionIndex++;
    }
  
    setTimeRemaining(time: number): void {
      this.timeRemaining = time;
    }
  
    finishGame(): void {
      this.isFinished = true;
    }
  }