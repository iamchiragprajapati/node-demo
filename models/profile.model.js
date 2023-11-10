const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String,
        unique: true
    },
    img: {
        require: true,
        type: String,
    }
});

const product = mongoose.model("profile", employeeSchema);
module.exports = product;