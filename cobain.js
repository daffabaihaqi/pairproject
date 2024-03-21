"use strict"

// const {User, UserProfile, Category, Court, Schedule} = require('./models/index.js');


// async function coba() {
//     try {
//         const pickedSchedule = await User.findByPk(4, {
//             include : Court
//         })

//         console.log(pickedSchedule);
//     } catch (error) {
//         console.log(error);
//     }
// }



// coba();

// const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//     host: 'smtp.imitate.email',
//     port: 587,
//     secure: false,
//     auth: {
//         user: '85f5eac1-2981-4322-9167-018e6235c0b0',
//         pass: 'fe1ce33d-1706-4cf3-828e-ef6b37eeb4bc',
//     }
// });

// transporter.sendMail({
//     from: "you@acme.com",
//     to: "satital103@sentrau.com",
//     subject: "Hi Imitate Email",
//     text: "Plaintext version of the message",
//     html: "<p>HTML version of the message</p>"
// })




// module.exports = transporter;

const transporter = require('./helper/emailsender.js');

transporter.sendMail({
    to: `baihaqidaff@gmail.com`,
    subject: 'Test Nodemailer',
    html: '<h1>Hi! How are you?</h1>'
    }).then(() => {
    console.log('Email sent')
    }).catch((err) => {
    console.log(err)
  });