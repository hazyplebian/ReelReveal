import {LeaderboardSystem} from './leaderboard.js'; 
import { UserFactory } from './user.js';
import sequelize from '../config/connection.js';

const Leaderboard = LeaderboardSystem(sequelize);
const User = UserFactory(sequelize);

export {Leaderboard, User};