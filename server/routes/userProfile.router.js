const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('GET/UserProfiles', req.user.id);
  
  const sqlText = `
    SELECT 
      "profiles"."first_name", 
      "profiles"."last_name",
      "profiles"."email",
      "profiles"."photo",
      "profiles"."facebook",
      "profiles"."linkedin",
      "profiles"."twitter",
      "profiles"."youtube", 
      "profiles"."instagram",
      "profiles"."portfolio",
      "profiles"."location_city",
      "profiles"."location_zip",
      "profiles"."location_state", 
      "profiles"."availability",
      "profiles"."about_me",
      "industry"."industry_name",
      "user"."id"
    FROM "profiles"
      JOIN "industry"
        ON "profiles"."industry_id"="industry"."id"
      JOIN "user"
        ON "profiles"."user_id"="user"."id"
      WHERE "user"."id"=$1;
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
