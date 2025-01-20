const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamCodeSchema = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    teamCode: {
        type: String,
        required: true,
    },
    members: {
        type: Schema.Types.Mixed,
        required: true,
    },
    verificationStatus: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
    },
    judgingStatus: {
        type: String,
        enum: ["pending", "verified"],
        default: "pending",
    },
    Judge: {
        type: Schema.Types.Mixed,
        default: {},
    },
    submittedAt: {
        type: Date,
        default: Date.now, // Automatically sets the current date when the document is created
    }
});

module.exports = mongoose.model("HackathonTeamCodes", teamCodeSchema);
