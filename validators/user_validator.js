const joi = require('joi');

const userSchema = joi.object({
    name: joi.string().required().min(2).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least {#limit} characters",
        "any.required": "Name is required",
    }),
    designation: joi.string().required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "any.required": "Name is required",
    })
})


function validateUser(userData) {
    return userSchema.validate(userData);
}


// module.exports.validateUser = validateUser;
module.exports = { validateUser }
