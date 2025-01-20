const express = require('express');
const authController = express.Router();
const User = require('../models/user_Schema');

// Route to get user profile by ID (excluding password)
authController.get('/:id/1', async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) return res.status(404).json({message: "Id not found"});

    // Find the user by ID, excluding the password field
    const user = await User.findOne({username: id}).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user details (password excluded)
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

authController.get('/:id/2', async (req, res) => {
  try {
    const { id } = req.params; // Get the username from the URL parameters
    
    if (!id) return res.status(404).json({ message: "Id not found" });

    // Find the user by username, excluding the password field
    const user = await User.findOne({ username: id }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if education details exist
    if (!user.education || Object.keys(user.education).length === 0) {
      return res.status(404).json({ message: 'Education details not found' });
    }

    // Return the user's education details
    res.status(200).json(user.education);
  } catch (error) {
    console.error('Error fetching user education:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to update user profile by ID
// Route to update user profile by username (ID)
authController.put('/:id/1', async (req, res) => {
  try {
    const { id } = req.params; // Get the username (or ID) from the URL parameters
    const updates = req.body;  // Data to update from the request body

    

    // Find the user by username (ID)
    const user = await User.findOne({ username: id }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's fields with the data provided in req.body
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    // Save the updated user data
    await user.save();

    // Return the updated user details (excluding the password)
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

authController.put('/:id/2', async (req, res) => {
  try {
    const { id } = req.params; // Get the username (or ID) from the URL parameters
    const updates = req.body;  // Data to update from the request body

    

    // Find the user by username (ID)
    const user = await User.findOne({ username: id }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's fields with the data provided in req.body
    Object.keys(updates).forEach((key) => {
      user['education'][key] = updates[key];
    });

    // Save the updated user data
    await user.save();

    // Return the updated user details (excluding the password)
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = authController;
