"use strict"

const {User, UserProfile, Category, Court, Schedule} = require('../models/index.js');
const bcrypt = require('bcryptjs');

class Controller {

    static async registerForm(req, res) {
        try {
            res.render('register-form.ejs')
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async registerAction(req, res) {
        try {
            const {email, password, role, firstName, lastName, dateOfBirth, address} = req.body;

            const CreatedUser = await User.create({
                email,
                password,
                role
            });

            await UserProfile.create({
                firstName,
                lastName,
                dateOfBirth,
                address,
                UserId : CreatedUser.id
            });

            res.redirect('/');

        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async loginForm(req, res) {
        try {
            res.render('login-form.ejs')
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async loginAction(req, res) {
        try {
            // 1. findOne User dari email
            // 2. compare plain password dengan hash password
            // 3. kalau tdk sama, gaboleh masuk ke home 
            // 4. kalau password sesuai, maka redirect ke home

            const {email, password} = req.body;

            const user = await User.findOne({ where : { email }});

            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password);

                if (isValidPassword) {
                    res.redirect('/');
                } else {
                    const error = "invalid username/password"
                    res.redirect(`/login/?error=${error}`)
                }
            } else {
                const error = "invalid username/password"
                res.redirect(`/login/?error=${error}`)
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
};

module.exports = Controller;