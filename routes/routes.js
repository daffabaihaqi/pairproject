"use strict"

const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js');


// Middleware untuk cek Session validasi
const isLoggedIn = function(req, res, next) {
    if (!req.session.userId) {
        const error = "Harap log-in terlebih dahulu"
        res.redirect(`/login/?error=${error}`)
    } else if (req.session.role === 'Admin') {
        const error = "Anda tidak memiliki akses!"
        req.session.destroy();
        res.redirect(`/login/?error=${error}`)
    } else {
        next()
    }
};

const isAdmin = function(req, res, next) {
    if (req.session.role !== 'Admin') {
        const error = "Anda tidak memiliki akses!"
        res.redirect(`/login/?error=${error}`);
    } else {
        next();
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

// Route untuk melihat carts
router.get('/cart', isLoggedIn, Controller.displayCart)

// Route untuk menampilkan seluruh lapangan
router.get('/', Controller.displayCourts);

// Route untuk menampilkan per kategori
router.get('/categories/:id', Controller.displayPerCategory);

// Route untuk menampilkan per lapangan
router.get('/courts/:id', Controller.displayPerCourt);

// Route untuk booking lapangan
router.post('/courts/:id/book', isLoggedIn, Controller.bookCourt);

// Route untuk menghapus bookingan
router.get('/schedules/:id', isLoggedIn, Controller.removeSchedule);



// Route untuk admin
router.get('/admin/home', isAdmin, Controller.displayAdminHome);

router.get('/admin/add', isAdmin, Controller.addCourtForm);

router.post('/admin/add', isAdmin, Controller.addCourtAction);

router.get('/admin/update/:id', isAdmin, Controller.updateCourtForm);

router.post('/admin/update/:id', isAdmin, Controller.updateCourtAction);

router.get('/admin/detail/:id', isAdmin, Controller.courtDetail);



module.exports = router;