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
    },
    price: {
        require: true,
        type: Number
    }
});

const product = mongoose.model("product", employeeSchema);
module.exports = product;