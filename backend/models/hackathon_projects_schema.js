const mongoose = require("mongoose");

const hackathonProjectsModel = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
    },
    teamCode: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    slogan: {
        type: String,
        required: true,
    },
    aboutProject: {
        type: String,
        required: true
    },
    challenges: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    links: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    coverUrl: {
        type: String,
        required: false
    },
    logoUrl: {
        type: String,
        required: false
    },
    imageUrls: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model("HackathonProjects", hackathonProjectsModel);