const { string } = require("joi");
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    email: {
        require: true,
        type: String,
        unique: true
    },
    name: {
        require: true,
        type: String,
    },
    profilePic: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model("profile", profileSchema);