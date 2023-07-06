//const { describe, it, after } = require('mocha');
const { db } = require('../../src/db');
const { expect } = require('chai');

describe('Base de datos', () => {
  it("La base de datos debe tener la tabla 'users'", (done) => {
    const query = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'users'
      )
    `;

    db.query(query, (err, res) => {
      if (err) {
        console.error('Ha ocurrido un error al ejecutar la sentencia:', err);
        done(err);
      } else {
        const exist = res.rows[0].exists;
        expect(exist).to.be.true;
        done();
      }
    });
  });

  it("La base de datos debe tener la tabla 'urls'", (done) => {
    const query = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'urls'
      )
    `;

    db.query(query, (err, res) => {
      if (err) {
        console.error('Ha ocurrido un error al ejecutar la sentencia:', err);
        done(err);
      } else {
        const exist = res.rows[0].exists;
        expect(exist).to.be.true;
        done();
      }
    });
  });
});
