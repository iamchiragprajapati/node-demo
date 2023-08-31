const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        require: true,
        type: String,
        unique: true
    },
    name: {
        require: true,
        type: String,
    },
    password: {
        require: true,
        type: String,
    },
    confirmPassword: {
        require: true,
        type: String,
    }
});

module.exports = mongoose.model("user", userSchema);