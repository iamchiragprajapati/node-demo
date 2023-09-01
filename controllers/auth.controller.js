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
                res.status(400).json({ message: 'This email address is already used by another user' })
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
                res.status(200).send({ data: user, message: 'User registered successfully, Please check you mail' });
            }
        }
    } catch (err) {
        res.status(400).json({ error: err, message: 'Bad request' });
    }
}

async function checkUserExist(user) {
    try {
        const userFind = await userModel.find({ email: user.email });
        return userFind.length ? true : false;
    } catch (err) {
        console.log(err);
    }
}

async function userLogin(req, res) {
    try {
        const user = await userModel.find({ email: req.body.email });
        if (user.length) {
            const validUser = validateUser(user[0], req.body);
            if (validUser) {
                const token = await jwt.sign(req.body.email, process.env.JWT_SECRET_KEY);
                res.status(200).send({ data: req.body, token, message: 'login successfully' });
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
    return userDetails.password === reqParams.password ? true : false;
}

module.exports = { userRegister, userLogin }