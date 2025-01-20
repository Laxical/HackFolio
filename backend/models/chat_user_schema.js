const mongoose = require("mongoose");

const chatUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    interactedEmails: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model("UserFriendsInfo", chatUserSchema);