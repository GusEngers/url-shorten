const { Schema, model } = require('mongoose');

const dataShema = new Schema({
  id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = model('url', dataShema);
