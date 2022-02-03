const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config');

//TODO: Target /:id for selected meeting param.
router.get('/photos', rejectUnauthenticated, (req,res) =>{
  const sqlText = `
    SELECT * FROM "meeting_uploads"
    WHERE "meeting_id"=$1;
  `;
  pool.query(sqlText, [req.params.id])
    .then((dbRes) =>{
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('/meetings/photos/:id GET error:', dbErr);
      resSendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, cloudinaryUpload.single('image'), async (req, res) => {
  // const imageDescription = req.body.description;
  // after the image uploads, we have access to req.file:
  console.log('nifty! req.file:', req.file)
  const imageUrl = req.file.path;
  const userId = req.user.id;
  const sqlText = `
    INSERT INTO "image"
      ("description", "image_path", "owner_id")
      VALUES
      ($1, $2, $3);
  `;
  const sqlValues = [imageDescription, imageUrl, userId];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error('db error in POST /api/images', dbErr)
      res.sendStatus(500);
    })
});

module.exports = router;