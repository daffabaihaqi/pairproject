'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile);
      User.belongsToMany(models.Court, {through : models.Schedule});
      User.hasMany(models.Schedule);
    }
  }
  User.init({
    email: {
      type :DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    password: {
      type : DataTypes.STRING, 
      allowNull: false
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(instance, option) {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash;
        instance.role = 'User';
      }
    }
  });
  return User;
};