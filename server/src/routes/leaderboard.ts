import { Pool, QueryResult } from 'pg';

interface PlayerPerformance {
  userId: number;
  username: string;
  winStreak: number;
  score: number;
  accuracy: number;
  hintsUsed: number;
  lastPlayed: Date;
}

interface LeaderboardEntry {
  userId: number;
  username: string;
  rank: number;
  winStreak: number;
  score: number;
}

class LeaderboardSystem {
  private pool: Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString });
  }

  async storePlayerPerformance(performance: PlayerPerformance): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query(
        `
        INSERT INTO player_performance (user_id, username, win_streak, score, accuracy, hints_used, last_played)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (user_id) DO UPDATE
        SET win_streak = $3, score = $4, accuracy = $5, hints_used = $6, last_played = $7, username = $2;
        `,
        [
          performance.userId,
          performance.username,
          performance.winStreak,
          performance.score,
          performance.accuracy,
          performance.hintsUsed,
          performance.lastPlayed,
        ]
      );
    } finally {
      client.release();
    }
  }

  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult<any> = await client.query(
        `
        SELECT user_id, username, win_streak, score,
        RANK() OVER (ORDER BY (score * win_streak / (hints_used + 1) * accuracy) DESC) as rank
        FROM player_performance
        ORDER BY rank ASC
        LIMIT $1;
        `,
        [limit]
      );
      return result.rows as LeaderboardEntry[];
    } finally {
      client.release();
    }
  }

  async getPlayerPerformance(userId: number): Promise<PlayerPerformance | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult<any> = await client.query(
        `
        SELECT * FROM player_performance WHERE user_id = $1;
        `,
        [userId]
      );
      if (result.rows.length > 0) {
        return result.rows[0] as PlayerPerformance;
      }
      return null;
    } finally {
      client.release();
    }
  }

  async getPlayerRank(userId: number): Promise<number | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult<any> = await client.query(
        `
        SELECT rank FROM (
          SELECT user_id, RANK() OVER (ORDER BY (score * win_streak / (hints_used + 1) * accuracy) DESC) as rank
          FROM player_performance
        ) AS ranked_players
        WHERE user_id = $1;
        `,
        [userId]
      );
      if (result.rows.length > 0) {
        return result.rows[0].rank as number;
      }
      return null;
    } finally {
      client.release();
    }
  }

  async getPlayerTrends(): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult<any> = await client.query(
        `
        SELECT date_trunc('day', last_played) as day, COUNT(*) as daily_plays
        FROM player_performance
        GROUP BY day
        ORDER BY day;
        `
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getMostGuessedMovies(): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult<any> = await client.query(
        `
        SELECT movie_title, COUNT(*) as guess_count
        FROM game_guesses
        GROUP BY movie_title
        ORDER BY guess_count DESC
        LIMIT 10;
        `
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getDifficultyLevels(): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult<any> = await client.query(
        `
        SELECT difficulty_level, AVG(accuracy) as avg_accuracy
        FROM game_results
        GROUP BY difficulty_level
        ORDER BY avg_accuracy;
        `
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL!;
const leaderboard = new LeaderboardSystem(connectionString);

(async function () {
const performance: PlayerPerformance = {
userId: 1,
username: 'TestUser',
winStreak: 5,
score: 1000,
accuracy: 0.95,
hintsUsed: 2,
lastPlayed: new Date(),
};

await leaderboard.storePlayerPerformance(performance);

const leaderboardData = await leaderboard.getLeaderboard();
console.log('Leaderboard:', leaderboardData);

const playerPerformance = await leaderboard.getPlayerPerformance(1);
console.log('Player Performance:', playerPerformance);

const playerRank = await leaderboard.getPlayerRank(1);
console.log("Player Rank:", playerRank)

const trends = await leaderboard.getPlayerTrends();
console.log('Player Trends:', trends);

const movies = await leaderboard.getMostGuessedMovies();
console.log('Most Guessed Movies:', movies);

const difficulties = await leaderboard.getDifficultyLevels();
console.log('Difficulty Levels:', difficulties);

await leaderboard.close();
}

)();

export default LeaderboardSystem;

export { LeaderboardSystem, PlayerPerformance, LeaderboardEntry };