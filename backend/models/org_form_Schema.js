const mongoose = require("mongoose");

const orgFormSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
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
    step: {
        type: Number,
        required: true,
        default: 0,
    },
    completelyFilled: {
        type: Boolean,
    }
});

module.exports = mongoose.model("OrgForm", orgFormSchema);