const { Schema, model } = require('mongoose');

const Url = model(
  'Url',
  new Schema({
    index: {
      type: String,
      required: true,
    },
    access_code: {
      type: String,
      default: '',
    },
    private: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    original_url: {
      type: String,
      required: true,
      validate: {
        validator: function (url) {
          const reg =
            /^((https|http|ftp|smtp):\/\/)(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
          return reg.test(url);
        },
        msg: 'El link ingresado no tiene un formato válido',
      },
    },
    shorten_url: {
      validator: function (url) {
        const reg =
          /^((https|http|ftp|smtp):\/\/)(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
        return reg.test(url);
      },
      msg: 'El link ingresado no tiene un formato válido',
    },
  })
);

module.exports = Url;
