const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config');

//TODO: Target /:id for selected meeting param.
router.get('/:id', rejectUnauthenticated, (req,res) =>{
  const sqlText = `
    SELECT * FROM "meeting_uploads"
    WHERE "meeting_id"=$1;
  `;
  pool.query(sqlText, [req.params.id])
    .then((dbRes) =>{
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('/uploads/:id GET error:', dbErr);
      resSendStatus(500);
    });
});

router.post('/:id', rejectUnauthenticated, cloudinaryUpload.single('image'), async (req, res) => {
  console.log('req.file:', req.file)
  const imageUrl = req.file.path;
  const sqlText = `
    INSERT INTO "meeting_uploads"
      ("image_title", "image_url", "meeting_id")
      VALUES
      ($1, $2, $3);
  `;
  const sqlValues = ["Placeholder Title", imageUrl, req.params.id];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error('/uploads/:id POST error:', dbErr)
      res.sendStatus(500);
    })
});

module.exports = router;