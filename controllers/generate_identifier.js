const Url = require('../models/url');
const isValidUrl = require('./validate');

/**
 * Genera un identificador para la Url ingresada
 * @param { string } url Url a generar el identificador
 * @returns { Promise<string> } Identificador de la Url
 */
async function generateIdentifier(url) {
  if (!url) throw new Error('Error: Missing Parameter!');
  if (!url.includes('://')) {
    url = `https://${url}`;
  }
  if (!(await isValidUrl(url)))
    throw new Error('Error: The URL already has a shortener!');

  let id = new Date().getTime().toString(36);
  let newUrl = new Url({ id, url });
  await newUrl.save();
  return newUrl.id;
}

module.exports = generateIdentifier;
