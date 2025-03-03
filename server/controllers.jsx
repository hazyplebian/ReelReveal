import Trivia from './models/Trivia'; // Assuming you have a Trivia model
import User from './models/User'; // Assuming you have a User model
import config from './config'; // Import your configuration

// Function to handle getting a random question
export const getRandomQuestion = async (req, res) => {
  try {
    const count = await Trivia.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomQuestion = await Trivia.findOne().skip(randomIndex);

    if (!randomQuestion) {
      return res.status(404).json({ message: 'No questions found.' });
    }

    res.json(randomQuestion);
  } catch (error) {
    console.error('Error getting random question:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Function to handle submitting an answer
export const submitAnswer = async (req, res) => {
  const { questionId, answer, userId } = req.body;

  try {
    const question = await Trivia.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    const isCorrect = question.correctAnswer === answer;

    // Update user score (example)
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        if (isCorrect) {
          user.score += 1; // Or any scoring logic
        }
        await user.save();
      }
    }

    res.json({ isCorrect, correctAnswer: question.correctAnswer });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Function to handle user registration
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Basic validation (add more robust validation)
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const newUser = new User({ username, password }); // Consider hashing the password
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Function to handle user login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) { // In a real app, use bcrypt or similar for password comparison
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT (example)
    const token = jwt.sign({ userId: user._id }, config.security.secret, {
      expiresIn: '1h', // Token expiration
    });

    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Function to get user score
export const getUserScore = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ score: user.score });
  } catch (error) {
    console.error('Error getting user score:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

//Function to add a question (admin only)
export const addQuestion = async (req, res) => {
    const { question, options, correctAnswer } = req.body;

    try {
        const newQuestion = new Trivia({ question, options, correctAnswer });
        await newQuestion.save();
        res.status(201).json({message: "Question added successfully"});
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({message: "Internal server error."});
    }
};

//Example of a protected route.
export const protectedRoute = async (req,res) => {
  res.json({message: "This is a protected route."});
}

export default {
    getRandomQuestion,
    submitAnswer,
    registerUser,
    loginUser,
    getUserScore,
    addQuestion,
    protectedRoute,
};