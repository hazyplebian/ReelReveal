# ReelReveal: Cinematic Trivia Challenge

**ReelReveal** is an engaging online movie trivia game designed to test your cinematic knowledge. Guess movie titles based on progressively revealed movie posters and hints. Built with a robust full-stack architecture, ReelReveal offers an interactive and polished user experience.

## Features

* **Interactive Gameplay:** Guess movie titles based on visual and textual hints.
* **Progressive Reveals:** Movie posters are gradually revealed to increase difficulty.
* **Win Streak & Guess Tracking:** Track your performance with win streaks and guess attempt counters.
* **Movie Details:** Access detailed information about each movie after guessing.
* **User Authentication:** Secure user authentication using JWT.
* **Responsive Design:** Seamless gameplay across various devices.
* **RESTful API:** Robust backend with GET and POST routes for data management.
* **External API Integration:** Utilizes multiple server-side APIs for enhanced movie data.

## Technologies Used

* **Frontend:**
    * React
    * CSS (Responsive Design)
* **Backend:**
    * Node.js
    * Express.js
    * PostgreSQL
    * Sequelize ORM
    * JSON Web Tokens (JWT)
    * Environment Variables (.env)
      
* **Deployment:**
  
    * Render (with PostgreSQL database)
      
* **External APIs:**
    * [API 1 Name and Link (e.g., The Movie Database API)](https://www.themoviedb.org/)
    * [API 2 Name and Link (e.g., OMDB API)](http://www.omdbapi.com/)

## API Endpoints

* `GET /api/movies`: Retrieve movie data for the game.
* `POST /api/movies`: Add new movie data to the database (admin only).
* `POST /api/auth/register`: Register a new user.
* `POST /api/auth/login`: Authenticate a user and receive a JWT.

## Environment Variables

To run the application locally, create a `.env` file in the `server/` directory with the following variables:

## Running Locally

1.  **Clone the repository:**

    ```bash
    git clone [your-repository-url]
    cd reelreveal
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    cd client
    npm install
    cd ../server
    npm install
    ```

3.  **Set up the database:**

    * Ensure PostgreSQL is installed and running.
    * Create a database using the name specified in your `DATABASE_URL`.
    * Run database migrations using Sequelize (if applicable).

4.  **Start the development servers:**

    ```bash
    # In the server directory:
    npm run dev

    # In the client directory (in a separate terminal):
    npm start
    ```

5.  **Open the application:**

    * Open your browser and navigate to `http://localhost:3000`.

## Deployment (Render)

1.  **Create a Render account and project.**
2.  **Connect your GitHub repository to Render.**
3.  **Configure Environment Variables:** Add your environment variables to Render's environment settings.
4.  **Set up a PostgreSQL database on Render and connect to it.**
5.  **Deploy the backend and frontend separately or using a monorepo setup.**
6.  **Ensure your Render instance has the correct build and start commands.**

## Code Quality

* **File Structure:** Follows the separation of concerns principle.
* **Naming Conventions:** Uses clear and consistent naming conventions for variables, functions, and components.
* **Indentation:** Consistent indentation for readability.
* **Comments:** Quality comments to explain complex logic and functionality.
* **Best Practices:** Adheres to best practices for React, Node.js, Express.js, and database interactions.
* **Class/ID Naming:** Uses descriptive and semantic class and ID names in CSS and components.

## Future Enhancements

* Implement user profiles and leaderboards.
* Add more movie categories and difficulty levels.
* Incorporate social sharing features.
* Expand the hint system with audio or video clips.
* Add more robust error handling and user feedback.
