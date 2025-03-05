import { DataTypes, Model, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false,
    } : false,
  },
});

interface PlayerPerformanceAttributes {
  userId: number;
  username: string;
  winStreak: number;
  score: number;
  accuracy: number;
  hintsUsed: number;
  lastPlayed: Date;
}

interface PlayerPerformanceInstance extends Model<PlayerPerformanceAttributes>, PlayerPerformanceAttributes {
    rank: any;
}

const PlayerPerformance = sequelize.define<PlayerPerformanceInstance>('PlayerPerformance', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  winStreak: {
  type: DataTypes.INTEGER,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accuracy: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  hintsUsed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lastPlayed: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

interface LeaderboardEntry {
  userId: number;
  username: string;
  rank: number;
  winStreak: number;
  score: number;
}

class LeaderboardSystem {
  private sequelize: Sequelize;

  constructor(sequelizeInstance: Sequelize) {
    this.sequelize = sequelizeInstance;
  }

  async storePlayerPerformance(performance: PlayerPerformanceAttributes): Promise<void> {
    await PlayerPerformance.upsert(performance);
  }

  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    const leaderboard = await PlayerPerformance.findAll({
      attributes: [
        'userId',
        'username',
        'winStreak',
        'score',
        [
          this.sequelize.literal(`RANK() OVER (ORDER BY (score * winStreak / (hintsUsed + 1) * accuracy) DESC)`),
          'rank',
        ],
      ],
      order: this.sequelize.literal('rank ASC'),
      limit: limit,
      raw: true,
    });

    return leaderboard.map(item => ({
      userId: item.userId,
      username: item.username,
      rank: item.rank,
      winStreak: item.winStreak,
      score: item.score,
    }));
  }

  async getPlayerPerformance(userId: number): Promise<PlayerPerformanceAttributes | null> {
    return PlayerPerformance.findByPk(userId);
  }

  async getPlayerRank(userId: number): Promise<number | null> {
    const result = await PlayerPerformance.findOne({
      attributes: [
        [
          this.sequelize.literal(`(SELECT rank FROM (SELECT userId, RANK() OVER (ORDER BY (score * winStreak / (hintsUsed + 1) * accuracy) DESC) as rank FROM "PlayerPerformances") AS ranked_players WHERE userId = ${userId})`),
          'rank',
        ],
      ],
      raw: true,
    });

    if (result) {
      const typedResult = result as unknown as { rank: string };
      if (typedResult.rank) {
        return parseInt(typedResult.rank, 10);
      }
    }
    return null;
  }

  async getPlayerTrends(): Promise<any[]> {
    const trends = await PlayerPerformance.findAll({
      attributes: [
        [this.sequelize.fn('date_trunc', 'day', this.sequelize.col('lastPlayed')), 'day'],
        [this.sequelize.fn('COUNT', '*'), 'daily_plays'],
      ],
      group: ['day'],
      order: [['day', 'ASC']],
      raw: true,
    });
    return trends;
  }

  async getMostGuessedMovies(): Promise<any[]> {
    const result = await sequelize.query(`
      SELECT movie_title, COUNT(*) as guess_count
      FROM game_guesses
      GROUP BY movie_title
      ORDER BY guess_count DESC
      LIMIT 10;
    `, { raw: true });
    return result[0];
  }

  async getDifficultyLevels(): Promise<any[]> {
    const result = await sequelize.query(`
      SELECT difficulty_level, AVG(accuracy) as avg_accuracy
      FROM game_results
      GROUP BY difficulty_level
      ORDER BY avg_accuracy;
    `, { raw: true });
    return result[0];
  }

  async syncDatabase(): Promise<void> {
    await this.sequelize.sync();
  }
}

const leaderboard = new LeaderboardSystem(sequelize);

(async function () {
  await leaderboard.syncDatabase();

  const performance: PlayerPerformanceAttributes = {
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
  console.log('Player Rank:', playerRank);

  const trends = await leaderboard.getPlayerTrends();
  console.log('Player Trends:', trends);

  const movies = await leaderboard.getMostGuessedMovies();
  console.log('Most Guessed Movies:', movies);

  const difficulties = await leaderboard.getDifficultyLevels();
  console.log('Difficulty Levels:', difficulties);

})();

export default LeaderboardSystem;
export { LeaderboardSystem, PlayerPerformanceAttributes, LeaderboardEntry };