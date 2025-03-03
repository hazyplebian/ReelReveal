import jwt from 'jsonwebtoken';
import config from './config';
import User from './models/User'; // Import your User model

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, config.security.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.userId; // Store user ID in request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Middleware to check if user is an admin (example)
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId); // Assuming req.userId is set by verifyToken

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!user.isAdmin) { //Assuming you have an isAdmin boolean on your User model
      return res.status(403).json({ message: 'Unauthorized. Admin access required.' });
    }

    next(); // Proceed if user is an admin
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Middleware to handle CORS (Cross-Origin Resource Sharing)
export const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.security.cors.origin); // Set allowed origin
  res.header('Access-Control-Allow-Methods', config.security.cors.methods); // Set allowed methods
  res.header('Access-Control-Allow-Headers', config.security.cors.allowedHeaders); // Set allowed headers
  res.header('Access-Control-Allow-Credentials', config.security.cors.credentials); //Allow credentials.

  if (req.method === 'OPTIONS') {
    res.sendStatus(200); // Respond to preflight requests
  } else {
    next(); // Proceed to the next middleware or route handler
  }
};

//Middleware to log requests.
export const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

export default {
  verifyToken,
  isAdmin,
  cors,
  requestLogger,
};