const { Client } = require('pg');

const URL = 'postgres://postgres:postgres@localhost:5432/postgres';
const client = new Client(URL);

(async() => {
  await client.connect()
})

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