'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User);
    }
  }
  UserProfile.init({
    firstName: {
      type : DataTypes.STRING,
      allowNull : false ,
      validate : {
        notNull : {
          msg : "First Name can't be empty"
        }, 
        notEmpty : {
          msg : "First Name can't be empty"
        }
      }},
    lastName: {
      type : DataTypes.STRING,
      allowNull : false ,
      validate : {
        notNull : {
          msg : "Last Name can't be empty"
        }, 
        notEmpty : {
          msg : "Last Name can't be empty"
        }
      }},
    dateOfBirth: {
      type : DataTypes.DATE, 
      allowNull : false, 
      validate : {
        notNull : {
          msg : "Date of Birth can't be empty"
        }
      }},
    UserId: {
      type : DataTypes.INTEGER, 
      allowNull : false},
    address: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Address can't be empty"
        }, 
        notEmpty : {
          msg : "Address can't be empty"
        }
      }
    },
    gender: {
      type : DataTypes.STRING, 
      allowNull : false, 
      validate : {
        notNull : {
          msg : "Gender can't be empty"
        }, 
        notEmpty : {
          msg : "Gender can't be empty"
        }
      }},
    phoneNumber: {
      type : DataTypes.STRING, 
      allowNull : false, 
      validate : {
        notNull : {
          msg : "Phone number can't be empty"
        }, 
        notEmpty : {
          msg : "Phone number can't be empty"
        }
      }}
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};