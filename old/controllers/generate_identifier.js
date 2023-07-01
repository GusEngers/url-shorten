const Url = require('../models/url');

/**
 * Genera un nuevo documento con la información necesaria para utilizar el acortador
 * @param { string } path Path donde se incluirá el nuevo id para la ruta
 * @param { string } original Ruta url original a acortar
 * @returns La nueva ruta acortada
 */
async function generateIdentifier(path, original) {
  let id = new Date().getTime().toString(36);
  let newUrl = new Url({ id, original, shorten: path + id });
  await newUrl.save();
  return newUrl.shorten;
}

module.exports = generateIdentifier;
