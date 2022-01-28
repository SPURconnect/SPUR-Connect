const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET
router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
    SELECT * FROM "user_messages"
      WHERE "sender_id" = $1 OR "recipient_id" = $1
      ORDER BY "timestamp" ASC;
    `;
  const sqlValues = [req.user.id]

  pool.query(sqlQuery, sqlValues)
  .then((result) => {
    res.send(result.rows)
  })
  .catch((error) => {
    console.log('error fetching user messages', error)
    res.sendStatus(500);
  })
})

// POST
router.post('/', rejectUnauthenticated, (req, res) => {
  const sqlValues = [
    req.body.content, 
    req.body.timestamp, 
    req.body.recipient_id, 
    req.user.id
  ];
  const sqlQuery = `
    INSERT INTO "user_messages"
      ("content", "timestamp", "recipient_id", "sender_id")
      VALUES ($1, $2, $3, $4)
  `;

  pool.query(sqlQuery, sqlValues)
  .then((result) => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('error posting new message', error)
    res.sendStatus(500);
  })
});

module.exports = router;
