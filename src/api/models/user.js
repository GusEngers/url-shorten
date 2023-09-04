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
    privates: [
      {
        type: Schema.ObjectId,
        ref: 'Url',
        default: [],
        validate: [
          {
            validator: function (privates) {
              let ids = privates.filter((id) => isObjectIdOrHexString(id));
              return ids.length === privates.length;
            },
            msg: 'El formato del id ingresado no es válido. El formato correcto es una cadena hexadecimal',
          },
          {
            validator: function (privates) {
              return privates.length >= 0 && privates.length <= 5;
            },
            msg: 'Sólo se permiten 5 acortadores privados por usuario',
          },
        ],
      },
    ],
    publics: [
      {
        type: Schema.ObjectId,
        ref: 'Url',
        default: [],
        validate: [
          {
            validator: function (publics) {
              let ids = publics.filter((id) => isObjectIdOrHexString(id));
              return ids.length === publics.length;
            },
            msg: 'El formato del id ingresado no es válido. El formato correcto es una cadena hexadecimal',
          },
          ,
          {
            validator: function (publics) {
              return publics.length >= 0 && publics.length <= 10;
            },
            msg: 'Sólo se permiten 10 acortadores públicos por usuario',
          },
        ],
      },
    ],
  })
);

module.exports = User;
