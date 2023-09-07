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
    },
    shorten_url: {
      type: String,
      required: true,
    },
  })
);

module.exports = Url;
