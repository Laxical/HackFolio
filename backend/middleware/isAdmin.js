const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/user_Schema');
 // Ensure User model is imported correctly
const app = express();
app.use(express.json());

const validuser = async (req, res, next) => {
  const token = req.cookies['jwt'];
  
  if (token) {
    jwt.verify(token, 'secret', async (err, data) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expired', expiredAt: err.expiredAt });
        }
        return res.status(400).send("Invalid Token");
      } else {
        try {
          req.username = data.username; // Attach the username to the request object
          
          // Fetch user data and check for roles
          const user = await User.findOne({ username: req.username }, 'roles');
          
          if (user && user.roles.includes('Admin')) {

            next(); // If the user has the 'admin' role, proceed
          } else {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
          }
        } catch (error) {
          return res.status(500).send('Server Error');
        }
      }
    });
  } else {
    return res.status(400).send('Token missing');
  }
};

module.exports = validuser;
