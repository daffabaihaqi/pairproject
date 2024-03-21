'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CourtId: {
        type: Sequelize.INTEGER, 
        references : {
          model : {
            tableName : 'Courts'
          }, 
          key : 'id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER, 
        references : {
          model : {
            tableName : 'Users'
          },
          key : 'id'
        }
      },
      date: {
        type: Sequelize.DATE
      },
      session: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedules');
  }
};