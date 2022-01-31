const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
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
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((dbErr) => {
      res.sendStatus(500)
    })
});

//this put route is to help edit a players stats
router.put('/:id', rejectUnauthenticated,(req, res) => {
  const sqlText = `
    UPDATE "profiles"
    SET
        "email"=$1, 
        "photo"=$2,
        "facebook"=$3,
        "linkedin"=$4,
        "twitter"=$5,
        "youtube"=$6,
        "instagram"=$7,
        "portfolio"=$8,
        "location_city"=$9,
        "location_zip"=$10
        "location_state"=$11, 
        "about_me"=$12,
    WHERE "user_id" = $13
    `;
  const sqlValues = [
    req.body.email,
    req.body.photo,
    req.body.facebook,
    req.body.linkedin,
    req.body.instagram,
    req.body.portfolio,
    req.body.location_city,
    req.body.location_zip,
    req.body.location_state,
    req.body.about_me,
    req.params.id
  ]
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      const sqlText2 = `
    UPDATE "industry"
    SET
        "industry_name"=$1 
    WHERE "id" = $2
    `;
      const sqlValues2 = [
        req.body.industry_name,
        req.params.id
      ]
      pool.query(sqlText2, sqlValues2)
      res.sendStatus(200)
    })
    .catch((dbErr) => {
      console.log('In Put Error', dbErr);
      res.sendStatus(500)
    })
})




module.exports = router;
