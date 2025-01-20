const mongoose = require("mongoose");

const hackParticipantDetails = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
        maxlength: 40,
    },
    email: {
        type: String,
        required: true,
    },
    aliasname: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phoneno: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    githubprofile: {
        type: String,
        required: true,
    },
    linkednprofile: {
        type: String,
        required: true,
    },
    portfoliowebsite: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    reviewed: {
        type: Boolean,
        required: true,
    },
    teamCode: {
        type: String,
        default: '',
    },
    teamName:{
        type: String,
        default: '',
        
    }
});

module.exports = mongoose.model("HackathonParticipantsDetails", hackParticipantDetails);