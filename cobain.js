"use strict"

const {User, UserProfile, Category, Court, Schedule} = require('./models/index.js');


async function coba() {
  try {
    

    const bookedSchedule = await Schedule.findOne({
      where : {
          date: new Date("2024-03-22 07:00:00.000 +0700"),
          session: "Sore",
          CourtId: 6
      }
    });

    console.log(bookedSchedule);
  } catch (error) {
    console.log(error);
  }
}

coba();