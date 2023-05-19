const Url = require('../models/url');

async function generateIdentifier(path, original) {
  let id = new Date().getTime().toString(36);
  let newUrl = new Url({ id, original, shorten: path + id });
  await newUrl.save();
  return newUrl.shorten;
}

module.exports = generateIdentifier;
