const { Client } = require('pg');

const URL = 'postgres://postgres:postgres@localhost:5432/postgres';
const client = new Client(URL);

(async () => {
  try {
    await client.connect();
    console.log('Elephant!');

    await client.query('DROP TABLE IF EXISTS data;');
    console.log('Dropped');

    await client.query(
      `CREATE TABLE IF NOT EXISTS data (data jsonb NOT NULL);`
    );
    console.log('Table');
  } catch (err) {
    await client.end();
    console.log('Fail');
  } finally {
    await client.end();
    console.log('End');
  }
})();

// item text NOT NULL,
// type text NOT NULL,
// price text NOT NULL,
// image text NOT NULL,
// colors text[] NOT NULL,
