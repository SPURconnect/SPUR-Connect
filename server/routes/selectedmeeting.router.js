const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
      SELECT * FROM "user_meetings"
      WHERE "user_id"=$1
  `;
  console.log('in selected meeting router', queryText)
  pool.query(queryText, [req.user.id])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch(dbErr => {
      console.log('/api/selectedmeetings GET error:', dbErr);
      res.sendStatus(500);
    });
});


module.exports = router;