const config = {
    // Server port
    port: process.env.PORT || 3001, // Use environment variable or default to 3001
  
    // Database configuration (example using MongoDB)
    database: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase', // MongoDB connection URI
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // other options...
      },
    },
  
    // API configuration
    api: {
      prefix: '/api', // Base API route prefix
      version: 'v1', // API version
      // other API-related settings...
    },
  
    // Security configuration
    security: {
      secret: process.env.JWT_SECRET || 'your-secret-key', // Secret key for JWT or other security measures
      // CORS settings (example)
      cors: {
        origin: '*', // or specify allowed origins like ['https://example.com', 'http://localhost:3000']
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization',
      },
      // other security settings...
    },
  
    // Logging configuration (example using Winston)
    logging: {
      level: process.env.LOG_LEVEL || 'info', // Logging level (e.g., 'debug', 'info', 'warn', 'error')
      format: 'combined', // Logging format
      // other logging settings...
    },
  
    // Environment-specific settings
    env: process.env.NODE_ENV || 'development', // Current environment (development, production, etc.)
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
  
    //Feature Flags
    featureFlags: {
      enableNewFeature: process.env.ENABLE_NEW_FEATURE === 'true',
      //other feature flags
    },
  
    // File Upload Settings
    uploads: {
      maxFileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB default
      uploadDirectory: process.env.UPLOAD_DIR || 'uploads/',
      allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    },
  
    // Session settings (if using sessions)
    session: {
      secret: process.env.SESSION_SECRET || 'your-session-secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    },
  
    // Email Configuration
    email: {
      service: process.env.EMAIL_SERVICE || 'gmail',
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  
    // external API keys
    externalAPIKeys: {
      someServiceAPIKey: process.env.SOME_SERVICE_API_KEY,
      anotherServiceAPIKey: process.env.ANOTHER_SERVICE_API_KEY,
    }
  
  };
  
  export default config;