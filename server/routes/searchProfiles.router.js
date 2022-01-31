const express = require('express');
const pool = require('../modules/pool');
const searchProfilesRouter = express.Router();

/**
 * GET route template
 */
searchProfilesRouter.get('/:input', (req, res) => {
  if (req.params.input === '')  {
    return;
  }
  else  {
  console.log(req.params.input)
  
  const query = `
    SELECT * FROM "profiles"
      WHERE "location_city" LIKE $1
        OR  "location_state" LIKE $1
        OR  "location_zip" LIKE $1
        OR  "first_name" LIKE $1
        OR  "last_name" LIKE $1;
    `;
    const queryValues = [`%${req.params.input}%`];
    pool.query(query, queryValues)
        .then( result => {
        res.send(result.rows);
        })
        .catch(err => {
        console.log('ERROR: GET searchProfiles', err);
        res.sendStatus(500)
        })
      }
  });



module.exports = searchProfilesRouter;