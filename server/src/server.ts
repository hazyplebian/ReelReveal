import express from "express";
import dotenv from "dotenv";
import path from "path";
import sequelize from "./config/database"; // Updated database connection
import userRoutes from "./routes/userRoutes";
import movieRoutes from "./routes/movieRoutes";
import guessRoutes from "./routes/guessRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false; // Change to true only if you want to reset the database

// Middleware
app.use(express.json()); // Allows Express to parse JSON request bodies

// Serve static files from the client's build folder (React Frontend)
app.use(express.static(path.join(__dirname, "../client/dist")));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/guesses", guessRoutes);

// Sync Sequelize models with the database
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
