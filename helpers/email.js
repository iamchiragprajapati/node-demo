const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const transportObj = {
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
}
const transporter = nodemailer.createTransport(transportObj);

const readHTML = async (params) => {
    return await ejs.renderFile(
        path.join(__dirname, "../views/pages/email.ejs"),
        params
    );
}

async function sendMail(senderEmail, params) {
    await readHTML(params).then(async (data) => {
        try {
            await transporter.sendMail({
                from: process.env.FROM_EMAIL,
                to: senderEmail,
                subject: "Welcome to Employee management system",
                html: data
            })
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = { sendMail }