const mongoose = require("mongoose");

const hackFullDetails = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
        maxlength: 40,
    },
    uniName: {
        type: String,
        required: true,
        maxlength: 40,
    },
    eventMode: {
        type: String,
        required: true,
        default: "",
    },
    tech: {
        type: String,
        required: true,
        default: "",
    },
    teamSize: {
        type: Number,
        required: true,
        default: "",
    },
    participantsProfile: {
        type: String,
        required: true,
        default: "",
    },
    contactLinks: {
        type: [String],
        required: true,
        default: [],
    },
    fromDate: {
        type: String,
        required: true,
        default: "",
    },
    toDate: {
        type: String,
        required: true,
        default: "",
    },
    prizesDesc: {
        type: String,
        required: true,
        default: "",
    },
    judges: { type: [String], default: [''] },
    criteria: {
        type: [
            {
                name: { type: String, required: true },
                maxMarks: { type: Number, required: true }
            }
        ],
        default: []
    },
    completelyFilled: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("HackathonDetails", hackFullDetails);