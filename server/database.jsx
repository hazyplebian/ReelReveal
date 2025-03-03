import mongoose from 'mongoose';
import config from './config'; // Import your configuration

const connectDB = async () => {
  try {
    await mongoose.connect(config.database.uri, config.database.options);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;

// Example Movie Model (models/Movie.jsx)
//-----------------------------------------

import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  category: {
    type: String, // e.g., "Classic Movies", "Sci-Fi", "Animated"
    required: false, //or true depending on your needs.
  },
  difficulty: {
    type: String, // e.g., "Easy", "Medium", "Hard"
    required: false,
  },
  imageUrl: {
      type: String, //URL to a movie poster or scene.
      required: false,
  }
});

const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;

// Example User Model (models/User.jsx)
//-----------------------------------------
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // Remember to hash this!
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  highScore: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;