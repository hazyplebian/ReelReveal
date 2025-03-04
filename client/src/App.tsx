import './App.css';
import { Sequelize } from 'sequelize';
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

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const leaderboard = require('./models/leaderboard');

async function main() {
    await leaderboard.syncDatabase();
    // Your application logic using the leaderboard system
    const leaderboardData = await leaderboard.getLeaderboard();
    console.log(leaderboardData);
}

main();

function App() {

  return (
    <div className="app">
      <h1>ReelReveal</h1>
    </div>
  );
}

export default App
