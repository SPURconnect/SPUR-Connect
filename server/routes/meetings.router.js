const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//POST meeting to database.
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    INSERT INTO "user_meetings" ("user_id", "participant_id", "meeting_title", "date", "meetup_location")
    VALUES ($1, $2, $3, $4, $5);
  `;
  const queryValues = [
    req.user.id,
    //Need participant ID
    req.body.meetingTitle,
    req.body.date,
    req.body.location
  ];
  pool.query(queryText, queryValues)
    .then((dbRes) =>{
      res.sendStatus(201);
    })
    .catch((dbErr) =>{
      console.log('/meetings POST err:', dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;