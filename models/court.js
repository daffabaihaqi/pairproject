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
      Court.hasMany(models.Schedule);
    }
  }
  Court.init({
    name: {
      type: DataTypes.STRING, 
      allowNull : false ,
      validate : {
        notNull : {
          msg : "Court Name can't be empty"
        }, 
        notEmpty : {
          msg : "Court Name can't be empty"
        }
      }},
    location: {
      type : DataTypes.STRING, 
      allowNull : false, 
      validate : {
        notNull : {
          msg : "Location can't be empty"
        }, 
        notEmpty : {
          msg : "Location can't be empty"
        }
      }},
    imageURL: {
      type : DataTypes.STRING, 
      allowNull : false, 
      validate : {
        notNull : {
          msg : "Image URL can't be empty"
        }, 
        notEmpty : {
          msg : "Image URL can't be empty"
        }
      }},
    description: {
      type : DataTypes.TEXT, 
      allowNull : false, 
      validate : {
        notNull : {
          msg : "Description can't be empty"
        }, 
        notEmpty : {
          msg : "Description can't be empty"
        }
      }},
    price: {
      type : DataTypes.INTEGER, 
      allowNull : false, 
      validate : {
        notNull : {
          msg : "Price can't be empty"
        }, 
        notEmpty : {
          msg : "Price can't be empty"
        }
      }},
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Court',
  });
  return Court;
};