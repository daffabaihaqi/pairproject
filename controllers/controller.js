const {User, UserProfile, Category, Court, Schedule} = require('../models/index.js');

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
            
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    };

    static async loginAction(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
};

module.exports = Controller;