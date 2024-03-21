"use strict"

const {User, UserProfile, Category, Court, Schedule} = require('./models/index.js');


async function coba() {
    try {
        const pickedSchedule = await User.findByPk(4, {
            include : Court
        })

        console.log(pickedSchedule);
    } catch (error) {
        console.log(error);
    }
}



coba();
