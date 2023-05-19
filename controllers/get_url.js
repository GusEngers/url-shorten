const Url = require('../models/url');

/**
 * Obtiene la Url original alojada en la base de datos
 * @param { string } id Identificador de la Url
 * @returns { Promise<string> } Url original
 */
async function getUrl(id) {
  if (!id) throw new Error('Error: Missing Parameter!');
  let response = await Url.findOne({ id });
  if (!response) throw new Error("Error: Requested URL doesn't exist!");
  return response.original;
}

async function getUrls() {
  let response = await Url.find().select('-_id -__v');
  return response;
}

module.exports = {
  getUrl,
  getUrls,
};
