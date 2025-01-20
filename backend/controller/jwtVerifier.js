const express = require('express');
const authController = express.Router();
const User = require('../models/user_Schema');
const isUser=require('../middleware/isUser')

authController.route('/')
    .get(isUser,async (req, res) => {
        const username=req.username;
        const response = await User.findOne({ username:username }, 'roles');
        try {
            return res.status(200).json({msg: "Success",roles:response.roles});
        } catch (e) {
            return res.status(400).json({ Error: "Error fetching users from Database!" });
        }
    });

module.exports = authController;
