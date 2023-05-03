const Url = require('../models/url');

/**
 * Verifica si la url que se desea acortar ya se encuentra en la base de datos
 * @param { string } url Url a validar
 * @returns { Promise<boolean> } true si es válido - false si no es válido
 */
async function isValidUrl(url) {
  let response = await Url.findOne({ url });
  if (!response) return true;
  return false;
}

module.exports = isValidUrl;
