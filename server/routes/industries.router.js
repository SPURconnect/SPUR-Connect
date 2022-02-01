const express = require('express');
const pool = require('../modules/pool');
const industriesRouter = express.Router();

/**
 * GET route template
 */
industriesRouter.get('/', (req, res) => {
  
  const query = `
    SELECT * FROM "industry"
      ORDER BY "industry_name" ASC
    `;
    
    pool.query(query)
        .then( result => {
        res.send(result.rows);
        })
        .catch(err => {
        console.log('ERROR: GET Industries', err);
        res.sendStatus(500)
        })
      
  });



module.exports = industriesRouter;