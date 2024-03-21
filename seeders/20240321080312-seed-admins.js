'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const admins = require('../data/admins.json').map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();

      const salt = bcrypt.genSaltSync(8);
      const hash = bcrypt.hashSync(el.password, salt);

      el.password = hash;

      return el;
    });

    await queryInterface.bulkInsert('Users', admins);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {});
  }
};
