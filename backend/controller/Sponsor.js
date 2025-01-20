const express = require('express');
const Sponsor = require('../models/sponser_Schema'); // Ensure this path is correct
const isUser = require('../middleware/isUser'); // Assuming this is for user authentication/authorization
const User=require('../models/user_Schema');
const jwt = require('jsonwebtoken');
const isAdmin=require('../middleware/isAdmin')
const router = express.Router();

// POST request to create a new sponsor
router.post('/',isUser, async (req, res) => {
  try {
    userName=req.username
    // Create a new sponsor instance with the request body
    sponsorData={
      ...req.body,userName
    }
    const sponsor = new Sponsor(sponsorData);

    // Save the sponsor to the database
    await sponsor.save();

    // Respond with success message and the created sponsor
    res.status(201).json({
      message: 'Sponsor created successfully',
      sponsor,
    });
  } catch (error) {
    // Handle validation or server errors
    console.error('Error creating sponsor:', error);
    res.status(400).json({
      message: 'Error creating sponsor',
      error: error.message,
    });
  }
});
router.get('/user/:companyName', async (req, res) => {
  try {
    const { companyName } = req.params;
    
    // Find a sponsor by company name (case-insensitive)
    const sponsor = await Sponsor.findOne({
      companyName: { $regex: new RegExp(companyName, "i") }
    });

    // Check if the sponsor was found
    if (!sponsor) {
      return res.status(202).json({ message: 'Sponsor not found' });
    }

    // Respond with the sponsor details
    res.status(200).json(sponsor);
  } catch (error) {
    console.error('Error fetching sponsor:', error);
    res.status(500).json({
      message: 'Error fetching sponsor',
      error: error.message,
    });
  }
});

// GET request to fetch sponsors with status 'Pending' for the admin dashboard
router.get('/adminDash', async (req, res) => {
  try {
    // Filter sponsors by status 'Pending'
    
    const sponsors = await Sponsor.find({ verificationStatus: 'Pending' });

    // Respond with the list of pending sponsors
    res.status(200).json(sponsors);
  } catch (error) {
    console.error('Error fetching sponsor details:', error);
    res.status(500).json({
      message: 'Error fetching sponsor details',
      error: error.message,
    });
  }
});
router.patch('/admin/verify/:companyName',isAdmin, async (req, res) => {
  const { companyName } = req.params;
  try {
    // Find and update the sponsor's verification status
    const sponsor = await Sponsor.findOneAndUpdate(
      { companyName },
      { verificationStatus: req.body.verificationStatus },
      { new: true }
    );

    // If sponsor not found, return 404
    if (!sponsor) {
      return res.status(202).json({ message: 'Sponsor not found' });
    }

    // Find the user associated with the sponsor and add "Sponsor" role to the roles array
    const user = await User.findOneAndUpdate(
      { username: sponsor.userName },
      { $addToSet: { roles: "Sponsor" } }, // Add "Sponsor" to the roles array if it doesn't already exist
      { new: true } // Return the updated document
    );

    // If user not found, return 404
    if (!user) {
      return res.status(202).json({ message: 'User not found' });
    }

    // Respond with the updated sponsor data
    res.status(200).json(sponsor);
  } catch (error) {
    console.error('Error verifying sponsor:', error);
    res.status(500).json({ message: 'Error verifying sponsor', error: error.message });
  }
});

// PATCH request to decline a sponsor by company name
router.patch('/admin/decline/:companyName',isAdmin, async (req, res) => {
  const { companyName } = req.params;
  try {
    const sponsor = await Sponsor.findOneAndUpdate(
      { companyName },
      { verificationStatus: req.body.verificationStatus },
      { new: true }
    );
    if (!sponsor) {
      return res.status(202).json({ message: 'Sponsor not found' });
    }
    res.status(200).json(sponsor);
  } catch (error) {
    console.error('Error declining sponsor:', error);
    res.status(500).json({ message: 'Error declining sponsor', error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    // Filter sponsors by status 'Pending'
    const sponsors = await Sponsor.find({ verificationStatus: 'Verified' });

    // Respond with the list of pending sponsors
    res.status(200).json(sponsors);
  } catch (error) {
    console.error('Error fetching pending sponsors:', error);
    res.status(500).json({
      message: 'Error fetching pending sponsors',
      error: error.message,
    });
  }
});

router.get('/updateSponsorDetails',isUser, async(req,res) => {
  const email = req.email;
  try {
    const data = await Sponsor.findOne({ email: email });
    res.status(200).json({data: data});
  } catch (error) {
    console.error('Error fetching pending sponsors:', error);
    res.status(500).json({
      message: 'Error fetching pending sponsors',
      error: error.message,
    });
  }
});

router.post('/updateSponsorDetails',isUser, async(req,res) => {
  const email = req.email;
  const {formData} = req.body;
  try {
    formData.email = email;
    const data = await Sponsor.findOneAndUpdate({ email: email },formData);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({error: "error saving to database.."});
  }
});

module.exports = router;
