import {leaderboardSeeds} from './leaderboard-seeds';
import sequelize from '../config/connection';

const seed = async (): Promise<void> => {
 try {
   await sequelize.sync({force: true});
   await leaderboardSeeds();
 }
    catch (error) {
      console.log("error seeding database", error); 
      process.exit(1);
    }
}

seed();