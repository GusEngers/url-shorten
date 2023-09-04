const { Schema, model, isObjectIdOrHexString } = require('mongoose');

const User = model(
  'User',
  new Schema({
    username: {
      type: String,
      required: true,
      validate: {
        validator: function (username) {
          return username.length >= 6;
        },
        msg: 'El nombre de usuario debe contener un mínimo de 6 caracteres',
      },
    },
    password: {
      type: String,
      required: true,
    },
    privates: {
      type: [Schema.ObjectId],
      ref: 'Url',
      default: [],
    },
    publics: {
      type: [Schema.ObjectId],
      ref: 'Url',
      default: [],
    },
  })
);

module.exports = User;
