import sequelize from '../config/connection';
import {LeaderboardSystem} from './leaderboard'; 

const Leaderboard = LeaderboardSystem(sequelize);

export {Leaderboard};