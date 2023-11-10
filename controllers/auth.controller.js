const userModel = require('../models/user.model');
const userValidator = require('../validators/user.validator');
const jwt = require('jsonwebtoken');
const mailer = require('../helpers/email');

async function userRegister(req, res) {
    try {
        const { error, value } = await userValidator.validateUser(req.body);
        if (error) {
            res.status(400).json({ error: error.details, message: error.details.map((x) => x.message).join(", ") });
        } else {
            const userExist = await checkUserExist(value);
            if (userExist) {
                res.status(400).json({ message: 'This email address is already used by another user' });
            } else {
                const userData = new userModel({
                    email: value.email,
                    name: value.name,
                    confirmPassword: value.confirmPassword,
                    password: value.password
                })
                const user = await userData.save();
                //send mail 
                await mailer.sendMail(
                    value.email,
                    {
                        name: value.name,
                        email: value.email,
                        password: value.password
                    }
                )
                res.status(200).send({ data: user, message: 'User registered successfully, Please check your mail' });
            }
        }
    } catch (err) {
        res.status(400).json({ error: err, message: 'Bad request' });
    }
}

async function checkUserExist(user) {
    try {
        const userFind = await userModel.find({ email: user.email });
        return !!userFind.length;
    } catch (err) {
        console.log(err);
    }
}

async function userLogin(req, res) {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            const validUser = validateUser(user, req.body);
            if (validUser) {
                const token = await jwt.sign({ data: req.body.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.EXPIRE_TIME });
                res.status(200).send({ data: user, token, message: 'login successfully' });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err, message: 'Bad request' });
    }
}

function validateUser(userDetails, reqParams) {
    return userDetails.password === reqParams.password;
}

module.exports = { userRegister, userLogin }