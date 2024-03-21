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
            const {email, password} = req.body;

            const user = await User.findOne({ where : { email }});

            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password);

                if (isValidPassword) {

                    req.session.userId = user.id
                    req.session.role = user.role

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
    };

    static async logoutAction(req, res) {
        try {
            req.session.destroy();
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async displayCourts(req, res) {
        try {
            
        } catch (error) {
            
        };
    };

    static async displayPerCategory(req, res) {
        try {
            
        } catch (error) {
            
        };
    };

    static async displayPerCourt(req, res) {
        try {
            
        } catch (error) {
            
        }
    }
};

module.exports = Controller;