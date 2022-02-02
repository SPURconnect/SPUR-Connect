const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
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

//Get notes for selected meeting.
router.get('/notes/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT "summary" FROM "user_meetings"
    WHERE "id" = $1;
  `;
  const sqlValues = [
    req.params.id
  ];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.send(dbRes.rows[0]);
    })
    .catch((dbErr) => {
      console.log('/meetings/notes/:id GET error:', dbErr);
      res.sendStatus(500);
    });
});

//Edit selected notes.
router.put('/notes/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    UPDATE "user_meetings" 
    SET "summary" = $1
    WHERE "id" = $2;
  `;
  const sqlValues = [
    req.body.notes,
    req.params.id
  ];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('/meetings/notes/:id PUT error:', dbErr);
      res.sendStatus(500);
    });
});

router.delete('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    DELETE FROM "user_meetings"
      WHERE "id"=$1;
  `;
  pool.query(sqlText, [req.body.id])
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('/meetings/notes/:id PUT error:', dbErr);
      res.sendStatus(500);
    });
})

module.exports = router;