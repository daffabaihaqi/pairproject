"use strict"

const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js');


// Middleware untuk cek Session validasi
const isLoggedIn = function(req, res, next) {
    if (!req.session.userId) {
        const error = "Harap log-in terlebih dahulu"
        res.redirect(`/login/?error=${error}`)
    }
}


// Middleware untuk melihat session
router.use(function (req, res, next) {
    console.log(req.session);
    next();
})


// Route untuk register
router.get('/register', Controller.registerForm);
router.post('/register', Controller.registerAction);

// Route untuk login
router.get('/login', Controller.loginForm);
router.post('/login', Controller.loginAction);

// Route untuk logout
router.get('/logout', Controller.logoutAction);

// Route untuk menampilkan seluruh lapangan
router.get('/', Controller.displayCourts);

// Route untuk menampilkan per kategori
router.get('/categories/:id', Controller.displayPerCategory);

// Route untuk menampilkan per lapangan
router.get('/courts/:id', Controller.displayPerCourt);

// Route untuk booking lapangan
router.get('/courts/:id/book', Controller.bookCourt);





module.exports = router;