"use strict"

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port : 465,
    secure: true,
    auth: {
        user: 'fakeemailforpp@gmail.com',
        pass : 'kcqs ctjl zatj fvtn '
    }
});

transporter.sendMail({
    to: 'satital103@sentrau.com',
    subject: 'Test Nodemailer',
    html: '<h1>Hi! How are you?</h1>'
}).then(() => {
    console.log('Email sent')
}).catch((err) => {
    console.log(err)
});

module.exports = nodemailer;