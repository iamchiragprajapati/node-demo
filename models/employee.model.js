const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String,
    },
    designation: {
        require: true,
        type: String,
    },
});

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;