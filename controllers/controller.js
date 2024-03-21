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
            res.redirect('/login')
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async displayCart(req, res) {
        try {
            const userId = req.session.userId;

            const bookedSchedule = await User.findByPk(userId, {
                include : {
                    model: Schedule,
                    attributes: ['id', 'CourtId', 'UserId', 'date', 'session', 'price', 'createdAt', 'updatedAt'], 
                    include : {
                        model : Court
                    }
                }, 
            });

            console.log(bookedSchedule.Schedules)

            res.render('cart.ejs', {
                bookedSchedule
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async displayCourts(req, res) {
        try {
            const courts = await Court.findAll();
            const activeUser = req.session.userId;

            res.render('home.ejs', {
                courts,
                activeUser
            });
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
            const activeUser = req.session.userId;
            const {id} = req.params;

            const pickedCourt = await Court.findByPk(+id, {
                include : Category
            });

            const today = (new Date()).toLocaleDateString('en-CA', {
                month : 'numeric',
                day : 'numeric',
                year : 'numeric'
            });

            res.render('court.ejs', {
                pickedCourt,
                today,
                activeUser
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async bookCourt(req, res) {
        try {
            const UserId = req.session.userId;
            const CourtId = +req.params.id;

            const {date, session} = req.body;

            const pickedCourt = await Court.findByPk(CourtId);
            const price = pickedCourt.price;

            const bookedSchedule = await Schedule.findOne({
                where : {
                    date: new Date(date),
                    session: session,
                }
            });

            if(bookedSchedule) {
                const error = "Lapangan sudah dipesan"
                return res.redirect(`/courts/${CourtId}/?error=${error}`)
            } else {
                await Schedule.create({
                    UserId,
                    CourtId,
                    date,
                    session,
                    price
                });
    
                return res.redirect('/cart');
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async removeSchedule(req, res) {
        try {
            const userId = req.session.userId;
            const { id } = req.params;

            const pickedSchedule = await Schedule.findOne({
                where : {
                    id
                }
            });

            if (pickedSchedule.UserId === userId) {
                await Schedule.destroy({
                    where : {
                        id 
                    }
                }); 

                return res.redirect('/cart');
            } else {
                return res.redirect('/login')
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
};

module.exports = Controller;