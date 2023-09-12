const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String,
        unique: true
    },
    designation: {
        require: true,
        type: String,
    },
    yearsOfExperience: {
        require: true,
        type: Number
    }
});

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;