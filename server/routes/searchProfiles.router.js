const express = require('express');
const pool = require('../modules/pool');
const searchProfilesRouter = express.Router();

/**
 * GET route template
 */
searchProfilesRouter.get('/:input', (req, res) => {
  if (req.params.input === '') {
    return;
  }
  else {

    const query = `
    SELECT * FROM "profiles"
    JOIN "industry" 
    ON "profiles"."industry_id"="industry"."id"
      WHERE UPPER("location_city") LIKE UPPER($1)
        OR  UPPER("location_state") LIKE UPPER($1)
        OR  UPPER("location_zip") LIKE UPPER($1)
        OR  UPPER("first_name") LIKE UPPER($1)
        OR  UPPER("last_name") LIKE UPPER($1)
        OR  UPPER("industry_name") LIKE UPPER($1);

    `;
    const queryValues = [`%${req.params.input}%`];
    pool.query(query, queryValues)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: GET searchProfiles', err);
        res.sendStatus(500)
      })
  }
});

searchProfilesRouter.get('/', (req, res) => {
  const query = `
      SELECT * FROM "profiles"`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: GET searchProfiles', err);
      res.sendStatus(500)
    })
}
);

searchProfilesRouter.get('/:id', (req, res) => {
  console.log('searchProfilesRouter', req.params.id)
  const query = `
      SELECT * FROM "profiles"
        WHERE "user_id"=$1`;
  const queryValues = [req.params.id];
  pool.query(query, queryValues)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: GET searchProfiles', err);
      res.sendStatus(500)
    })
}
);


module.exports = searchProfilesRouter;