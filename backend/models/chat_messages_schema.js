const mongoose = require("mongoose");

const chatMessagesSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    readStatus: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model("UserChatMessages", chatMessagesSchema);