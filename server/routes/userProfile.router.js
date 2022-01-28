const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('GET/UserProfiles', req.user.id);
  
  const sqlText = `
    SELECT * FROM "profiles"
    WHERE "user_id"=$1;
  `;
  const sqlValues = [req.user.id]
  pool.query (sqlText, sqlValues)
  .then ((dbRes)=>{
    res.send(dbRes.rows)
  })
  .catch ((dbErr)=>{
    res.sendStatus(500)
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
