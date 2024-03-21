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

            await User.create({
                email,
                password,
                role
            });

            await UserProfile.create({
                firstName,
                lastName,
                dateOfBirth,
                address
            });

            res.redirect('/');

        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
};

module.exports = Controller;