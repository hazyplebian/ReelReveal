import {LeaderboardSystem} from './leaderboard.js'; 
import sequelize from '../config/connection.js';

const Leaderboard = LeaderboardSystem(sequelize);

export {Leaderboard};