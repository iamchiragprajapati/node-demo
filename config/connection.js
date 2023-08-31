
const mongoose = require('mongoose');
async function dbConnection() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = { dbConnection };