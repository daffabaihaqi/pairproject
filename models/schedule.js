'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Court);
      Schedule.belongsTo(models.User);
    }

    get formattedDate() {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      return this.date.toLocaleDateString('id-ID', options);
    }
  }
  Schedule.init({
    CourtId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    session: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};