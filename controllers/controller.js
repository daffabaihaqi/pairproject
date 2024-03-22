"use strict"

const {User, UserProfile, Category, Court, Schedule} = require('../models/index.js');
const bcrypt = require('bcryptjs');
const toRupiah = require('../helper/helper.js');

class Controller {

    static async registerForm(req, res) {
        try {
            const {error} = req.query;

            res.render('register-form.ejs', {
                error
            })
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
            if (error.name = 'SequelizeValidationError') {
                const errors = error.errors.map((el) => {
                    return el.message
                });

                res.redirect(`/register?error=${errors}`);
            } else {
                res.send(error.message);
            }
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

                    if (req.session.role === 'Admin') {
                        res.redirect('/admin/home')
                    } else {
                        res.redirect('/');
                    }
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
            const activeUser = req.session.userId;
            const {query} = req.query;

            let condition = {};

            if (query) {
                condition.CategoryId = +query
            }

            const courts = await Court.findAll({
                where : condition
            });

            const convertedPrice = courts.map((el) => {
                return toRupiah(el.price);
            });

            res.render('home.ejs', {
                courts,
                convertedPrice,
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
                    CourtId
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
    };

    static async displayAdminHome(req, res) {
        try {
            const courts = await Court.findAll();

            res.render('admin/admin-home.ejs', {
                courts
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async addCourtForm(req, res) {
        try {
            const {error} = req.query;
            res.render('admin/admin-add-court.ejs', {
                error
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    };

    static async addCourtAction(req, res) {
        try {
            const {name, location, imageURL, description, price, CategoryId} = req.body;

            await Court.create({
                name,
                location,
                imageURL,
                description,
                price: +price,
                CategoryId : +CategoryId
            });

            res.redirect('/admin/home');
        } catch (error) {
            console.log(error);
            if (error.name = 'SequelizeValidationError') {
                const errors = error.errors.map((el) => {
                    return el.message
                });

                res.redirect(`/admin/add?error=${errors}`);
            } else {
                res.send(error.message);
            }
        }
    };

    static async updateCourtForm(req, res) {
        try {
            const {error} = req.query;
            const {id} = req.params;

            const pickedCourt = await Court.findByPk(+id);

            res.render('admin/admin-update-court.ejs', {
                pickedCourt,
                error
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async updateCourtAction(req, res) {
        const {name, location, imageURL, description, price, CategoryId} = req.body;
        const {id} = req.params;
        try {
            await Court.update({
                name,
                location,
                imageURL,
                description,
                price,
                CategoryId
            }, {
                where : {
                    id : +id
                }
            });

            res.redirect('/admin/home');
        } catch (error) {
            console.log(error);
            if (error.name = 'SequelizeValidationError') {
                const errors = error.errors.map((el) => {
                    return el.message
                });

                res.redirect(`/admin/update/${id}/?error=${errors}`);
            } else {
                res.send(error.message);
            }
        };
    };

    static async courtDetail(req, res) {
        try {
            const {id} = req.params;

            const courtDetail = await Court.findByPk(+id, {
                include : {
                    model : Schedule,
                    attributes: ['id', 'CourtId', 'UserId', 'date', 'session', 'price', 'createdAt', 'updatedAt'], 
                    include : {
                        model : User,
                        include : {
                            model : UserProfile
                        }
                    }
                }
            })

            res.render('admin/admin-court-detail.ejs', {
                courtDetail
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    };
};

module.exports = Controller;