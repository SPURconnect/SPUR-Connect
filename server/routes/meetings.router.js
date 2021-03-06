const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GETs all the meetings associated with the logged in user
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
      SELECT * FROM "user_meetings"
      WHERE "user_id"=$1
      ORDER BY "date" DESC
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

// GETs single meeting of logged in user based on id
router.get('/:id', rejectUnauthenticated, (req, res) => {

  const queryText = `
      SELECT * FROM "user_meetings"
      WHERE "id"=$1 AND "user_id"=$2
  `;
  pool.query(queryText, [req.params.id, req.user.id])
  
    .then((dbRes) => {
      res.send(dbRes.rows[0]);
    })
    .catch(dbErr => {
      console.log('/meetings GET error:', dbErr);
      res.sendStatus(500);
    });
});

//POST meeting to database.
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    INSERT INTO "user_meetings" ("user_id","summary", "participant_id", "meeting_title", "date", "meetup_location")
    VALUES ($1, $2, $3, $4, $5, $6);
  `;
  const queryValues = [
    req.user.id,
    req.body.summary,
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

// GET notes for selected meeting.
router.get('/notes/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT "meeting_notes" FROM "user_meetings"
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

// Edit selected notes.
router.put('/notes/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    UPDATE "user_meetings" 
    SET "meeting_notes" = $1
    WHERE "id" = $2
    RETURNING "id";
  `;
  const sqlValues = [
    req.body.notes,
    req.params.id
  ];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.send(dbRes.rows[0]);
    })
    .catch((dbErr) => {
      console.log('/meetings/notes/:id PUT error:', dbErr);
      res.sendStatus(500);
    });
});

// GET meeting details for selected meeting.
router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
  console.log('in meeting router get meeting detail ', req.params.id);
  const sqlText = `
  SELECT * FROM "user_meetings"
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

// Updates selected meeting details
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    UPDATE "user_meetings" 
    SET "meetup_location" = $1, "date" = $2, "summary" = $3
    WHERE "id" = $4;
    
  `;
  const sqlValues = [
    req.body.meetup_location, req.body.date, req.body.summary, 
    req.params.id
  ];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('/meeting/details/edit:id PUT error:', dbErr);
      res.sendStatus(500);
    });
});

// DELETES selected meeting 
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
});


module.exports = router;