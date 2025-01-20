const mongoose = require("mongoose");
const { Schema } = mongoose;

const hackWebDetails = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
        maxlength: 40,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    aboutHack: {
        type: String,
        required: true,
    },
    aboutPrize: {
        type: String,
        required: true,
    },
    otherFields: {
        type: Schema.Types.Mixed,
    },
});

module.exports = mongoose.model("HackathonWebpageDetails", hackWebDetails);