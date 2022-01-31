const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { response } = require('express');

router.get('/', rejectUnauthenticated, async (req, res) => {
  const queryText = `
      SELECT * FROM "user_meetings"
      WHERE "user_id"=$1
  `;
  pool.query(queryText, [req.user.id])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch(dbErr => {
      console.log('/meetings GET error:', dbErr);
      res.sendStatus(500);
    });
});

//POST meeting to database.
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    INSERT INTO "user_meetings" ("user_id", "participant_id", "meeting_title", "date", "meetup_location")
    VALUES ($1, $2, $3, $4, $5);
  `;
  const queryValues = [
    req.user.id,
    req.body.participant,
    req.body.meetingTitle,
    req.body.date,
    req.body.location
  ];
  pool.query(queryText, queryValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log('/meetings POST error:', dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;