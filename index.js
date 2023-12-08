require('dotenv').config()
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const usersRoutes = require('./routes/users.js');
const middlewareLogRequest = require('./middleware/logs.js');
const upload = require('./middleware/mutler.js');
const usersController = require('./controller/users.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(middlewareLogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'));
app.use('/users', usersRoutes);

// Passport Configuration
passport.use(new GoogleStrategy({
    clientID: process.env.YOUR_GOOGLE_CLIENT_ID,
    clientSecret: process.env.YOUR_GOOGLE_CLIENT_SECRET,
    //callbackURL: 'http://localhost:5000/auth/google/callback', -> local
    callbackURL: 'http://auth.saddan.my.id:8443/auth/google/callback', // -> production
  },
  (accessToken, refreshToken, profile, done) => {
    // Use profile information to create or update user in your database
    // For simplicity, let's assume you have a function `findOrCreateUser` in your controller
    usersController.findOrCreateUser(profile, done);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Google OAuth Routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect('/profile');
  }
);

app.get('/profile', (req, res) => {
  // Ensure user is authenticated
  if (req.isAuthenticated()) {
    // Access user information from req.user
    res.send(`Hello, ${req.user.displayName}!`);
  } else {
    res.redirect('/');
  }
});

// Upload Route
app.post('/upload', upload, (req, res) => {
  res.json({
    message: 'upload success',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
