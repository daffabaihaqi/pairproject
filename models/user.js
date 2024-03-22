'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

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
      unique : true,
      validate : {
        notNull : {
          msg : "Email can't be empty"
        },
        notEmpty : {
          msg : "Email can't be empty"
        }
      }
    },
    password: {
      type : DataTypes.STRING, 
      allowNull: false,
      validate : {
        notNull : {
          msg : "Password can't be empty"
        },
        notEmpty : {
          msg : "Password can't be empty"
        }
      }
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
      },
      afterCreate(instance, option) {
        const email = instance.email;

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port : 465,
          secure: true,
          auth: {
              user: 'fakeemailforpp@gmail.com',
              pass : 'kcqs ctjl zatj fvtn '
          }
        });
      
        transporter.sendMail({
            to: `${email}`,
            subject: 'Salam dari Pamungkan Sports Club',
            html: '<h1>Hi! Terimakasih telah menjadi bagian dari Pamungkan Sports Club</h1>'
        }).then(() => {
            console.log('Email sent')
        }).catch((err) => {
            console.log(err)
        });
      }
    }
  });
  return User;
};