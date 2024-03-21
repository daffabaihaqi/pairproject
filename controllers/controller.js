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
            const {email, password, firstName, lastName, gender, phoneNumber, dateOfBirth, address} = req.body;

            const CreatedUser = await User.create({
                email,
                password,
            });

            await UserProfile.create({
                firstName,
                lastName,
                dateOfBirth,
                address,
                gender,
                phoneNumber,
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
            res.send('hello world');
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async displayPerCategory(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async displayPerCourt(req, res) {
        try {
            const {id} = req.params;

            // const pickedCourt = await Court.findByPk(+id, { 
            //     include : Category
            // });

            const pickedCourt = await Court.findByPk(+id, {
                include : Category
            });

            const today = (new Date()).toLocaleDateString('en-CA', {
                month : 'numeric',
                day : 'numeric',
                year : 'numeric'
            });

            console.log(today)

            res.render('court.ejs', {
                pickedCourt,
                today
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async bookCourt(req, res) {
        try {
            res.send(req.body);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
};

module.exports = Controller;