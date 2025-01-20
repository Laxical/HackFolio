const mongoose = require("mongoose");

const chatStatusModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
    socketId: {
        type: String,
        default: "",
    }
});

module.exports = mongoose.model("UserChatStatus", chatStatusModel);