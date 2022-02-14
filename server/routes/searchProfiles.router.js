const express = require('express');
const pool = require('../modules/pool');
const searchProfilesRouter = express.Router();

// GET profiles from search based on current input
searchProfilesRouter.get('/:input', (req, res) => {
  // checks if the input is empty else does a query
  if (req.params.input === '') {
    return;
  }
  else {
    const query = `
    SELECT * FROM "profiles"
    JOIN "industry" 
    ON "profiles"."industry_id"="industry"."id"
      WHERE (UPPER("location_city") LIKE UPPER($1) AND "availability" = TRUE)
        OR  (UPPER("location_state") LIKE UPPER($1) AND "availability" = TRUE)
        OR  (UPPER("location_zip") LIKE UPPER($1) AND "availability" = TRUE)
        OR  (UPPER("first_name") LIKE UPPER($1) AND "availability" = TRUE)
        OR  (UPPER("last_name") LIKE UPPER($1) AND "availability" = TRUE)
        OR  (UPPER("industry_name") LIKE UPPER($1) AND "availability" = TRUE)
        OR  (CONCAT (UPPER("first_name"), ' ', UPPER("last_name")) LIKE UPPER($1) AND "availability" = TRUE)
        OR  (CONCAT (UPPER("location_city"), ', ', UPPER("location_state")) LIKE UPPER($1) AND "availability" = TRUE)
        ORDER BY "industry_name" ASC, "last_name" ASC;
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

// GETs all the profiles to store in the profiles reducer
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

// GETs a single profile based on id
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