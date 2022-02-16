const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Gets All Profile Info for User Profile View
router.get('/', rejectUnauthenticated, (req, res) => {
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
      "profiles"."industry_id",
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

// Gets User Profile information by Route Parameter. 
router.get('/:id', rejectUnauthenticated, (req, res) => {
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
      res.send(dbRes.rows[0])
    })
    .catch((dbErr) => {
      res.sendStatus(500)
    })
});

//this put route is to help edit a players stats
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    UPDATE "profiles"
    SET
        "email"=$1, 
        "photo"=$2,
        "first_name"=$3, 
        "last_name"=$4,
        "facebook"=$5,
        "linkedin"=$6,
        "twitter"=$7,
        "youtube"=$8,
        "instagram"=$9,
        "portfolio"=$10,
        "location_city"=$11,
        "location_zip"=$12,
        "location_state"=$13, 
        "about_me"=$14,
        "industry_id"=$15
    WHERE "user_id" = $16
    `;
  const sqlValues = [
    req.body.email,
    req.body.photo,
    req.body.first_name,
    req.body.last_name,
    req.body.facebook,
    req.body.linkedin,
    req.body.twitter,
    req.body.youtube,
    req.body.instagram,
    req.body.portfolio,
    req.body.location_city,
    req.body.location_zip,
    req.body.location_state,
    req.body.about_me,
    req.body.industry_id,
    req.user.id
  ]
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200)
    })
    .catch((dbErr) => {
      console.log('In Put Error', dbErr);
      res.sendStatus(500)
    })
})

router.put('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    UPDATE "profiles"
    SET
        "availability"=$1
    WHERE "user_id" = $2;
    `;
  const sqlValues = [
    req.body.availability,
    req.user.id
  ]
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200)
    })
    .catch((dbErr) => {
      console.log('In Put Error', dbErr);
      res.sendStatus(500)
    })
})


module.exports = router;
