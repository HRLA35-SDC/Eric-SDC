// Dependencies
const Router = require('@koa/router');
const router = new Router();
const { Client } = require('pg');

// Database connection

const URL = 'postgres://postgres:postgres@localhost:5432/postgres';
const client = new Client(URL);

// Declarations

router.get('/search/:keyword', async (ctx) => {
  const keyword = ctx.request.url.substring(8);
  console.log(keyword);
  try {
    // Timer start
    let start = process.hrtime.bigint();

    const data = await client.query(
      `SELECT * FROM data WHERE data @> '{"collections": ["est"]}' LIMIT 50;`
    );

    // Reponse back to client
    ctx.body = data;

    // Timer end
    let end = process.hrtime.bigint();
    console.log(
      `Finished in: ${(parseInt(end - start, 10) / 1e6).toFixed(2)} ms`
    );
  } catch (err) {
    ctx.body = err;
  }
});

module.exports = router;
