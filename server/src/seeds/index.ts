import {leaderboardSeeds} from './leaderboard-seeds.js'
import sequelize from '../config/connection.js';

//A function for creating seeds for all of the tables in the database.
const seed = async (): Promise<void> => {
 try {
    console.log("-----Creating Seeds-----"); 
    await sequelize.sync({force: true});
    await leaderboardSeeds();
    console.log("-----LeaderBoard Seeds Created-----"); 
 }
    catch (error) {
      console.log("error seeding database", error); 
      process.exit(1);
    }
}

seed();