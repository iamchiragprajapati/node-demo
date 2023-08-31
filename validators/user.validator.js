const joi = require('joi');

const userSchema = joi.object({
    name: joi.string().required().min(2).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least {#limit} characters",
        "any.required": "Name is required",

    }),
    email: joi.string().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),
    password: joi.string().required().min(6).max(8).messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least {#limit} characters",
        "string.max": "Password must be at least {#limit} characters",
        "any.required": "Password is required",
    }),
    confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
        'any.only': 'Password and Confirm password must match',
        'any.required': 'Confirm Password is required',
    })
})


function validateUser(userData) {
    return userSchema.validate(userData);
}

module.exports = { validateUser }
