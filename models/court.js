'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Court extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Court.belongsTo(models.Category);
      Court.belongsToMany(models.User, {through : models.Schedule});
      Court.hasMany(models.Category);
    }
  }
  Court.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Court',
  });
  return Court;
};