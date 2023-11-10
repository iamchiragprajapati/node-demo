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

// userSchema.pre('find', async function (query, results,next) {
//     query.where('name',{})
//     try {
//         console.log('result', this.email);
//     } catch (error) {
//         console.log(error);
//         throw newError(error);
//     }
//     next();
// })

userSchema.post('find', async function (query, results, next) {
    // results = results.filter(user => user.email.length > 20);
    results.forEach(user => {
        user.latestAt = new Date();
    });
    console.log(results);
    next(null, results);
    // Modify the results array here
    // next();
});


module.exports = mongoose.model('User', userSchema);
