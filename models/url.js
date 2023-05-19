const { Schema, model } = require('mongoose');

const dataShema = new Schema({
  id: {
    type: String,
    required: true,
  },
  original: {
    type: String,
    required: true,
    validate: [
      {
        validator: function (original) {
          const reg =
            /^((https|http|ftp|smtp):\/\/)(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
          return reg.test(original);
        },
        msg: "The entered url doesn't comply with the valid url format",
      },
    ],
  },
  shorten: {
    type: String,
    required: true,
  },
});

module.exports = model('url', dataShema);
