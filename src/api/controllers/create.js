const { db } = require('../../db');

async function create(link) {
  try {
    const query1 = 'INSERT INTO links (original) VALUES ($1)';
    await db.query(query1, [link]);
    const query2 = 'SELECT * FROM links WHERE original = $1';
    const { rows } = await db.query(query2, [link]);
    return rows[0].id;
  } catch (_) {
    throw new Error('Error al generar el acortador');
  }
}

module.exports = create;
