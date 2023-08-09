const { db } = require('../../db');

async function getUrl(id) {
  try {
    const query = 'SELECT * FROM links WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    if (!rows.length) throw new Error(`No existe un registro con el id '${id}'`);
    return rows[0].original;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getUrl;
