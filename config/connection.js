
const mongoose = require('mongoose');
async function dbConnection() {
    try {
        await mongoose.connect('mongodb://localhost:27017/e-commerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = { dbConnection };