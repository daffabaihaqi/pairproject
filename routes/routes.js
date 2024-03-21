"use strict"

const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js');



router.get('/', (req, res) => {
    res.send('Hello World')
});

router.get('/register', Controller.registerForm);

router.post('/register', Controller.registerAction);

router.get('/login', (req, res) => {

});


router.get('/categories/:id', (req, res) => {

});

router.get('/courts/:id', (req, res) => {

});






module.exports = router;